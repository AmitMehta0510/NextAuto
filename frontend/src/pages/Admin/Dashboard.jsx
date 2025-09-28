// import React, { useEffect, useState, useContext } from "react";
// import Card from "../../components/common/Card";
// import { Link } from "react-router-dom";
// import API from "../../utils/api";
// import axios from "axios";
// import AuthContext from "../../context/AuthContext.jsx";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [salesData, setSalesData] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const token = user.token;

//     console.log("Token in dashboard: ", token);
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // fetch stats
//     axios
//       .get("http://localhost:5000/api/admin/stats", config)
//       .then((res) => setStats(res.data))
//       .catch((err) => console.error("Error fetching stats:", err));

//     // fetch sales report (monthly)
//     axios
//       .get("http://localhost:5000/api/admin/reports/sales", config)
//       .then((res) => setSalesData(res.data))
//       .catch((err) => console.error("Error fetching sales report:", err));
//   }, []);

//   if (!stats) return <p>Loading dashboard...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <h3 className="text-lg font-semibold">Total Revenue</h3>
//           <p className="text-2xl font-bold text-blue-600 mt-2">
//             ${stats.totalRevenue}
//           </p>
//         </Card>
//         <Card>
//           <h3 className="text-lg font-semibold">Orders</h3>
//           <p className="text-2xl font-bold text-green-600 mt-2">
//             {stats.totalOrders}
//           </p>
//         </Card>
//         <Card>
//           <h3 className="text-lg font-semibold">Products</h3>
//           <p className="text-2xl font-bold text-purple-600 mt-2">
//             {stats.totalProducts}
//           </p>
//         </Card>
//         <Card>
//           <h3 className="text-lg font-semibold">Users</h3>
//           <p className="text-2xl font-bold text-orange-600 mt-2">
//             {stats.totalUsers}
//           </p>
//         </Card>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card title="Monthly Sales">
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={salesData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>
//         <Card title="Sales Trend">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={salesData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#10b981"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       {/* Quick Links */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
//           <Link to="/admin/products" className="text-blue-600 hover:underline">
//             Go to Products →
//           </Link>
//         </Card>
//         <Card>
//           <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
//           <Link to="/admin/orders" className="text-blue-600 hover:underline">
//             Go to Orders →
//           </Link>
//         </Card>
//         <Card>
//           <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
//           <Link to="/admin/users" className="text-blue-600 hover:underline">
//             Go to Users →
//           </Link>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
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
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.token) {
          setError("Authentication failed. Please login again.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const [statsRes, salesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/stats", config),
          axios.get("http://localhost:5000/api/admin/reports/sales", config),
        ]);

        setStats(statsRes.data);
        setSalesData(salesRes.data);
        console.log("Fetched stats:", statsRes.data);
        console.log("Fetched sales data:", salesRes.data);
      } catch (err) {
        setError("Failed to load dashboard data. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400 text-xl">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 text-xl font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          color="from-green-400 to-emerald-600"
          isCurrency
        />
        <StatCard
          title="Orders"
          value={stats.totalOrders}
          color="from-blue-400 to-indigo-600"
        />
        <StatCard
          title="Products"
          value={stats.totalProducts}
          color="from-purple-400 to-fuchsia-600"
        />
        <StatCard
          title="Users"
          value={stats.totalUsers}
          color="from-orange-400 to-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="📊 Monthly Sales">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="sales"
                fill="url(#colorSales)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="📈 Sales Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickLinkCard title="Manage Products" link="/admin/products" />
        <QuickLinkCard title="Manage Orders" link="/admin/orders" />
        <QuickLinkCard title="Manage Users" link="/admin/users" />
      </div>
    </div>
  );
};

export default Dashboard;

const StatCard = ({ title, value, color, isCurrency }) => (
  <div
    className={`bg-gradient-to-r ${color} p-6 rounded-2xl shadow-lg text-white`}
  >
    <h3 className="text-sm uppercase tracking-wide font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-3">
      {isCurrency ? `₹${value?.toLocaleString()}` : value?.toLocaleString()}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-[#111827] p-6 rounded-2xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4 text-gray-200">{title}</h3>
    {children}
  </div>
);

const QuickLinkCard = ({ title, link }) => (
  <div className="bg-[#1F2937] p-6 rounded-2xl shadow-lg hover:bg-[#111827] transition">
    <h3 className="text-lg font-semibold mb-2 text-gray-200">{title}</h3>
    <Link to={link} className="text-cyan-400 hover:underline">
      Go →
    </Link>
  </div>
);
