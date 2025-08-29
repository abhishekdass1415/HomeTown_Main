"use client";
import { useState } from "react";

// A reusable date formatting component that only runs on the client
function ClientDate({ date }) {
  if (!date) return "-";
  const d = new Date(date);
  return <>{d.toLocaleString("en-US", { hour12: true })}</>;
}

export default function InventoryLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      productId: "P001",
      change: 10,
      reason: "Stock Added",
      notes: "New shipment arrived",
      createdAt: new Date().toISOString(),
      userId: "admin123",
    },
    {
      id: 2,
      productId: "P002",
      change: -5,
      reason: "Order Shipped",
      notes: "Shipped to customer",
      createdAt: new Date().toISOString(),
      userId: "staff456",
    },
  ]);

  const [form, setForm] = useState({
    productId: "",
    change: "",
    reason: "",
    notes: "",
    userId: "",
  });

  const handleAddLog = () => {
    if (!form.productId || !form.change || !form.reason) return;

    setLogs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...form,
        change: parseInt(form.change, 10),
        createdAt: new Date().toISOString(),
      },
    ]);
    setForm({ productId: "", change: "", reason: "", notes: "", userId: "" });
  };

  return (
    <div className="md:ml-64 pt-16">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Inventory Logs
        </h2>

        {/* Add Log Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Add New Log</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product ID"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Change (+/-)"
              value={form.change}
              onChange={(e) => setForm({ ...form, change: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="User ID"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              className="border rounded p-2"
            />
          </div>
          <button
            onClick={handleAddLog}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add Log
          </button>
        </div>

        {/* Logs Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Logs</h3>
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">Product ID</th>
                <th className="border px-3 py-2 text-left">Change</th>
                <th className="border px-3 py-2 text-left">Reason</th>
                <th className="border px-3 py-2 text-left">Notes</th>
                <th className="border px-3 py-2 text-left">User ID</th>
                <th className="border px-3 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="border px-3 py-2">{log.productId}</td>
                  <td className="border px-3 py-2">{log.change}</td>
                  <td className="border px-3 py-2">{log.reason}</td>
                  <td className="border px-3 py-2">{log.notes}</td>
                  <td className="border px-3 py-2">{log.userId}</td>
                  <td className="border px-3 py-2">
                    <ClientDate date={log.createdAt} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
