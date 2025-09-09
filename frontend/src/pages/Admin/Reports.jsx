// import React, { useEffect, useState } from "react";
// import { getReports } from "../../services/reportService";

// const Reports = () => {
//   const [reports, setReports] = useState(null);

//   useEffect(() => {
//     const fetchReports = async () => {
//       const { data } = await getReports();
//       setReports(data);
//     };
//     fetchReports();
//   }, []);

//   if (!reports) return <p className="p-6">Loading reports...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Reports</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="p-4 bg-white shadow rounded">
//           <h3 className="font-semibold">Total Sales</h3>
//           <p className="text-lg">${reports.totalSales}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded">
//           <h3 className="font-semibold">Orders Count</h3>
//           <p className="text-lg">{reports.ordersCount}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded">
//           <h3 className="font-semibold">Total Users</h3>
//           <p className="text-lg">{reports.usersCount}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;

import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Reports = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    API.get("/admin/reports/sales").then((res) => setReport(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sales Reports</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={report}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reports;
