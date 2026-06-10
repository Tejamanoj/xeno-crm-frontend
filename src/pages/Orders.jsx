import { useState } from "react";

const initialOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    amount: 2500,
    date: "2026-06-01",
    status: "Delivered",
  },
  {
    id: "ORD002",
    customer: "Sarah Smith",
    amount: 1800,
    date: "2026-06-03",
    status: "Delivered",
  },
  {
    id: "ORD003",
    customer: "Michael Johnson",
    amount: 3200,
    date: "2026-06-05",
    status: "Pending",
  },
];

export default function Orders() {
  const [search, setSearch] = useState("");

  const filteredOrders = initialOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Orders
      </h1>

      <div className="bg-panel border border-border rounded-xl p-5">
        <p className="text-sm text-muted">
          Total Revenue
        </p>

        <p className="text-3xl font-bold text-emerald-400 mt-2">
          ₹{totalRevenue.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center bg-panel border border-border rounded-lg px-3 py-2 max-w-sm">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent w-full outline-none text-white placeholder:text-muted"
        />
      </div>

      <div className="bg-panel border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="text-left px-5 py-3">
                Order ID
              </th>

              <th className="text-left px-5 py-3">
                Customer
              </th>

              <th className="text-right px-5 py-3">
                Amount
              </th>

              <th className="text-center px-5 py-3">
                Date
              </th>

              <th className="text-center px-5 py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/50 hover:bg-white/5"
              >
                <td className="px-5 py-3 text-white">
                  {order.id}
                </td>

                <td className="px-5 py-3 text-white">
                  {order.customer}
                </td>

                <td className="px-5 py-3 text-right text-emerald-400 font-medium">
                  ₹{order.amount.toLocaleString()}
                </td>

                <td className="px-5 py-3 text-center text-muted">
                  {order.date}
                </td>

                <td className="px-5 py-3 text-center">
                  <span
                    className={
                      order.status === "Delivered"
                        ? "px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400"
                        : "px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400"
                    }
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}