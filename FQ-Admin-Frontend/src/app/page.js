"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useInventory } from "@/context/Inventorycontext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// 🔹 Sample Data for Pie Chart
const topSellingProducts = [
  { name: "Sofa", value: 400 },
  { name: "Dining Table", value: 300 },
  { name: "Chair", value: 200 },
  { name: "Bed", value: 100 },
];

export default function Dashboard() {
  const { inventory } = useInventory();

  // Filter low-stock & out-of-stock
  const lowStock = inventory.filter((item) => item.stock > 0 && item.stock <= 5);
  const outOfStock = inventory.filter((item) => item.stock === 0);

  return (
    <div className="md:ml-64 pt-16">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 🔹 Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Order ID</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">#ORD-1234</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4">$1,200.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">#ORD-1235</td>
                      <td className="px-6 py-4">Jane Smith</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">
                          Processing
                        </span>
                      </td>
                      <td className="px-6 py-4">$850.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 🔹 Top Selling Products (Pie Chart) */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topSellingProducts}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {topSellingProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 🔹 Inventory Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Low Stock */}
              <h3 className="font-semibold text-yellow-600 mb-2">⚠ Low Stock</h3>
              {lowStock.length > 0 ? (
                <ul className="list-disc list-inside mb-4">
                  {lowStock.map((item) => (
                    <li key={item.id}>
                      {item.name} - <span className="font-bold">{item.stock}</span> left
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mb-4">No low stock products ✅</p>
              )}

              {/* Out of Stock */}
              <h3 className="font-semibold text-red-600 mb-2">❌ Out of Stock</h3>
              {outOfStock.length > 0 ? (
                <ul className="list-disc list-inside">
                  {outOfStock.map((item) => (
                    <li key={item.id}>
                      {item.name} -{" "}
                      <span className="font-bold text-red-500">Restock Needed</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No out of stock products ✅</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
