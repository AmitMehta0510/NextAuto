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
