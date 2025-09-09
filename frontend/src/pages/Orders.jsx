// import React from "react";
// import Card from "../components/common/Card";
// import Table from "../components/common/Table";

// const Orders = () => {
//   const orders = [
//     { id: 101, total: "₹1500", status: "Shipped", date: "2025-09-01" },
//     { id: 102, total: "₹900", status: "Pending", date: "2025-09-05" },
//   ];

//   const columns = [
//     { key: "id", label: "Order ID" },
//     { key: "total", label: "Total" },
//     { key: "status", label: "Status" },
//     { key: "date", label: "Date" },
//   ];

//   return (
//     <Card title="My Orders">
//       <Table columns={columns} data={orders} />
//     </Card>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="border p-4 rounded">
            <p><b>Order ID:</b> {o._id}</p>
            <p><b>Status:</b> {o.status}</p>
            <p><b>Total:</b> ${o.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
