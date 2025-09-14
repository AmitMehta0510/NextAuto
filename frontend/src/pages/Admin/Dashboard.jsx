import React, { useEffect, useState, useContext } from "react";
import Card from "../../components/common/Card";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = user.token;

    console.log("Token in dashboard: ", token);
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // fetch stats
    axios
      .get("http://localhost:5000/api/admin/stats", config)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));

    // fetch sales report (monthly)
    axios
      .get("http://localhost:5000/api/admin/reports/sales", config)
      .then((res) => setSalesData(res.data))
      .catch((err) => console.error("Error fetching sales report:", err));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ${stats.totalRevenue}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {stats.totalOrders}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            {stats.totalProducts}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {stats.totalUsers}
          </p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Monthly Sales">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Sales Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
          <Link to="/admin/products" className="text-blue-600 hover:underline">
            Go to Products →
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
          <Link to="/admin/orders" className="text-blue-600 hover:underline">
            Go to Orders →
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <Link to="/admin/users" className="text-blue-600 hover:underline">
            Go to Users →
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
