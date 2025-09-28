import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import Button from "../../components/common/Button.jsx";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    API.get("/admin/orders").then((res) => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
              <td className="p-2">
                {o.orderItems.map((i) => i.product?.name).join(", ")}
              </td>
              <td className="p-2">${o.totalPrice}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2 space-x-2">
                <Button onClick={() => updateStatus(o._id, "Shipped")}>
                  Mark Shipped
                </Button>
                <Button
                  onClick={() => updateStatus(o._id, "Delivered")}
                  className="bg-green-600"
                >
                  Mark Delivered
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
