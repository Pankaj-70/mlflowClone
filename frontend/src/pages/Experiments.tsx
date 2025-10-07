// src/components/Experiments.tsx
import React, { useState } from "react";

interface Experiment {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  description?: string;
  tags?: string[];
}

const initialExperiments: Experiment[] = [
  { id: 1, name: "rahul", createdAt: "10/07/2025, 12:20:25 PM", modifiedAt: "10/07/2025, 12:20:25 PM" },
  { id: 2, name: "Wine classification", createdAt: "10/06/2025, 08:34:56 PM", modifiedAt: "10/06/2025, 08:34:56 PM" },
  { id: 3, name: "Default", createdAt: "10/06/2025, 04:53:33 PM", modifiedAt: "10/06/2025, 04:53:33 PM" },
];

const Experiments: React.FC = () => {
  const [experiments, setExperiments] = useState(initialExperiments);
  const [search, setSearch] = useState("");

  const filteredExperiments = experiments.filter((exp) =>
    exp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200 text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Experiments</h2>
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md font-bold cursor-pointer hover:bg-blue-700 text-sm transition">
          + Create
        </button>
      </div>

      {/* Error Alert */}
      <div className="bg-red-50 text-red-600 px-3 py-2 rounded-md mb-3 text-sm border border-red-200">
        Failed to fetch
      </div>

      {/* Filter Section */}
      <div className="flex mb-3 gap-2">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1.5 flex-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <select className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400">
          <option>Tag filter</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-gray-700">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2 border-b w-8"><input type="checkbox" /></th>
              <th className="p-2 border-b text-left">Name</th>
              <th className="p-2 border-b text-left">Created</th>
              <th className="p-2 border-b text-left">Modified</th>
              <th className="p-2 border-b text-left">Description</th>
              <th className="p-2 border-b text-left">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredExperiments.map((exp) => (
              <tr
                key={exp.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-2 border-b text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border-b text-blue-600 hover:underline cursor-pointer">
                  {exp.name}
                </td>
                <td className="p-2 border-b text-gray-600">{exp.createdAt}</td>
                <td className="p-2 border-b text-gray-600">{exp.modifiedAt}</td>
                <td className="p-2 border-b text-gray-500">{exp.description || "-"}</td>
                <td className="p-2 border-b text-gray-500">{exp.tags?.join(", ") || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
        <span>25 / page</span>
        <div className="space-x-3">
          <button className="hover:text-blue-600 transition">Previous</button>
          <button className="hover:text-blue-600 transition">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Experiments;
