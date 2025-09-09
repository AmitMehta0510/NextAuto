// import React, { useEffect, useState } from "react";
// import { getAllOrders, updateOrderStatus } from "../../services/orderService";
// import Button from "../../components/ui/Button";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     const { data } = await getAllOrders();
//     setOrders(data);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (id, status) => {
//     await updateOrderStatus(id, status);
//     fetchOrders();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
//       <table className="w-full border-collapse border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Order ID</th>
//             <th className="border p-2">Customer</th>
//             <th className="border p-2">Total</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((o) => (
//             <tr key={o._id} className="text-center">
//               <td className="border p-2">{o._id}</td>
//               <td className="border p-2">{o.user?.name}</td>
//               <td className="border p-2">${o.total}</td>
//               <td className="border p-2">{o.status}</td>
//               <td className="border p-2 flex justify-center gap-2">
//                 <Button
//                   onClick={() => handleStatusChange(o._id, "Shipped")}
//                   variant="secondary"
//                 >
//                   Mark Shipped
//                 </Button>
//                 <Button
//                   onClick={() => handleStatusChange(o._id, "Delivered")}
//                   variant="success"
//                 >
//                   Mark Delivered
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageOrders;

import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import Button from "../../components/common/Button.jsx";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    API.get("/admin/orders").then((res) => setOrders(res.data));
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/admin/orders/${id}`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User</th>
            <th className="p-2">Items</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="p-2">{o.user?.name}</td>
              <td className="p-2">{o.items.map(i => i.product?.name).join(", ")}</td>
              <td className="p-2">${o.total}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2 space-x-2">
                <Button onClick={() => updateStatus(o._id, "Shipped")}>Mark Shipped</Button>
                <Button onClick={() => updateStatus(o._id, "Delivered")} className="bg-green-600">Mark Delivered</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
