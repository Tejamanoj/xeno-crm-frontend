import { useState, useEffect } from "react";
import { api } from "../lib/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();

        console.log("ORDERS DATA:", data);

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Orders Error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = Array.isArray(orders)
    ? orders.filter(
        (order) =>
          order.id?.toLowerCase().includes(search.toLowerCase()) ||
          order.customer_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
      )
    : [];

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + Number(order.amount),
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
        {loading ? (
          <p className="text-center py-10 text-muted">
            Loading...
          </p>
        ) : (
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
                    {order.id.slice(0, 8)}
                  </td>

                  <td className="px-5 py-3 text-white">
                    {order.customer_name}
                  </td>

                  <td className="px-5 py-3 text-right text-emerald-400 font-medium">
                    ₹{Number(order.amount).toLocaleString()}
                  </td>

                  <td className="px-5 py-3 text-center text-muted">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
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
        )}
      </div>
    </div>
  );
}