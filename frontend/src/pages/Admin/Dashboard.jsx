import React from "react";
import Card from "../../components/common/Card";
import { Link } from "react-router-dom";
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

const salesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 800 },
  { name: "Apr", sales: 700 },
  { name: "May", sales: 1000 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">$25,000</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">320</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">150</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl font-bold text-orange-600 mt-2">1200</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Monthly Sales">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Sales Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
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
