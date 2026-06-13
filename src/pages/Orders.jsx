import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { api } from "../lib/api";

export default function Orders() {
  const [orders, setOrders]         = useState([]);
  const [customers, setCustomers]   = useState([]);
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm]             = useState({ customer_id: "", amount: "", status: "Pending" });
  const [formError, setFormError]   = useState("");

  // GET /api/orders returns { success, count, orders } — we read data.orders
  async function fetchOrders() {
    try {
      setLoading(true);
      const data = await api.getOrders();
      console.log("ORDERS DATA:", data);
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  // GET /api/customers returns an array directly
  async function fetchCustomers() {
    try {
      const data = await api.getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Customers fetch error:", err);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchOrders();
      await fetchCustomers();
    })();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.id?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase())
  );

  // Total Revenue = SUM(amount) across ALL orders (not filtered)
  // This matches what you'd get from SELECT SUM(amount) FROM orders
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount), 0);

  async function handleAddOrder() {
    setFormError("");
    if (!form.customer_id)
      return setFormError("Please select a customer.");
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setFormError("Please enter a valid amount.");

    try {
      setSubmitting(true);
      const result = await api.addOrder({
        customer_id: form.customer_id,
        amount:      Number(form.amount),
        status:      form.status,
      });
      if (result.success) {
        setShowModal(false);
        setForm({ customer_id: "", amount: "", status: "Pending" });
        // Re-fetch both so orders table + customer totals stay in sync across pages
        await fetchOrders();
        await fetchCustomers();
      } else {
        setFormError(result.error || "Failed to create order.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <button
          onClick={() => { setShowModal(true); setFormError(""); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition"
        >
          <Plus size={14} />
          New Order
        </button>
      </div>

      {/* Total Revenue card — SUM(amount) from orders table */}
      <div className="bg-panel border border-border rounded-xl p-5">
        <p className="text-sm text-muted">Total Revenue</p>
        <p className="text-3xl font-bold text-emerald-400 mt-2">
          ₹{totalRevenue.toLocaleString()}
        </p>
        <p className="text-xs text-muted mt-1">{orders.length} orders total</p>
      </div>

      {/* Search */}
      <div className="flex items-center bg-panel border border-border rounded-lg px-3 py-2 max-w-sm">
        <input
          type="text"
          placeholder="Search by order ID or customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent w-full outline-none text-white placeholder:text-muted text-sm"
        />
      </div>

      {/* Orders table */}
      <div className="bg-panel border border-border rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-center py-10 text-muted">Loading…</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center py-10 text-muted text-sm">No orders found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/50 text-xs text-muted">
                <th className="text-left  px-5 py-3">Order ID</th>
                <th className="text-left  px-5 py-3">Customer</th>
                <th className="text-right px-5 py-3">Amount</th>
                <th className="text-center px-5 py-3">Date</th>
                <th className="text-center px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-white/5">
                  <td className="px-5 py-3 text-white font-mono text-xs">
                    {order.id.slice(0, 8)}
                  </td>
                  <td className="px-5 py-3 text-white">{order.customer_name}</td>
                  <td className="px-5 py-3 text-right text-emerald-400 font-medium">
                    ₹{Number(order.amount).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-center text-muted">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString()
                      : "—"}
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

      {/* Add Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-panel border border-border rounded-xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-white">New Order</h2>

            {/* Customer select — populated from /api/customers */}
            <div>
              <label className="text-xs text-muted block mb-1">Customer</label>
              <select
                value={form.customer_id}
                onChange={(e) => setForm((p) => ({ ...p, customer_id: e.target.value }))}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="">— select customer —</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.segment})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs text-muted block mb-1">Amount (₹)</label>
              <input
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                placeholder="e.g. 2500"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-xs text-muted block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              >
                <option>Pending</option>
                <option>Delivered</option>
              </select>
            </div>

            {formError && (
              <p className="text-red-400 text-xs">{formError}</p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrder}
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition disabled:opacity-50"
              >
                {submitting ? "Creating…" : "Create Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}