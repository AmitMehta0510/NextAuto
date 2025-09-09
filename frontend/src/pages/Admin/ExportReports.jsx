import React from "react";
import { Download } from "lucide-react";

const ExportReports = () => {
  const handleExport = (type) => {
    alert(`Exporting data as ${type} (mock). In real app, connect API here.`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Export Reports</h2>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="mb-4 text-gray-600">Choose a format to export data:</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleExport("CSV")}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Download size={18} /> Export as CSV
          </button>
          <button
            onClick={() => handleExport("Excel")}
            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <Download size={18} /> Export as Excel
          </button>
          <button
            onClick={() => handleExport("PDF")}
            className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            <Download size={18} /> Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;
