import { useState, useEffect } from "react";
import { UserPlus, Search } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { api } from "../lib/api";

const segColor = {
  VIP: "amber",
  Active: "green",
  New: "blue",
  Lapsed: "rose",
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const data = await api.getCustomers();

        setCustomers(data || []);
      } catch (error) {
        console.error("Customer Error:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  async function addCustomer() {
    if (!form.name || !form.email) return;

    try {
      const newCustomer = await api.addCustomer(form);

      if (!newCustomer.error) {
        setCustomers((prev) => [
          newCustomer,
          ...prev,
        ]);

        setForm({
          name: "",
          email: "",
          phone: "",
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCustomer(id) {
    try {
      await api.deleteCustomer(id);

      setCustomers((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  const filtered = customers.filter(
    (c) =>
      c.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.phone
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-panel border border-border rounded-lg px-3 py-2 w-72">
          <Search size={13} className="text-muted" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search name, email, phone..."
            className="bg-transparent text-xs text-white placeholder:text-muted outline-none w-full"
          />
        </div>

        <Button
          onClick={() => setShowModal(true)}
          size="md"
        >
          <UserPlus size={14} />
          Add Customer
        </Button>
      </div>

      <div className="text-xs text-muted">
        Showing {filtered.length} of{" "}
        {customers.length} customers
      </div>

      <div className="bg-panel border border-border rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-center text-muted py-10 text-sm">
            Loading...
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted border-b border-border bg-surface/50">
                <th className="text-left px-5 py-3">
                  Name
                </th>
                <th className="text-left px-5 py-3">
                  Email
                </th>
                <th className="text-left px-5 py-3">
                  Phone
                </th>
                <th className="text-center px-5 py-3">
                  Orders
                </th>
                <th className="text-right px-5 py-3">
                  Spent
                </th>
                <th className="text-center px-5 py-3">
                  Segment
                </th>
                <th className="text-center px-5 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border/50 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3 text-white font-medium">
                    {c.name}
                  </td>

                  <td className="px-5 py-3 text-muted">
                    {c.email}
                  </td>

                  <td className="px-5 py-3 text-muted">
                    {c.phone}
                  </td>

                  <td className="px-5 py-3 text-center font-mono text-white">
                    {c.total_orders}
                  </td>

                  <td className="px-5 py-3 text-right font-mono text-emerald-400">
                    ₹
                    {c.total_spent.toLocaleString()}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <Badge
                      label={c.segment}
                      color={
                        segColor[c.segment] ??
                        "muted"
                      }
                    />
                  </td>

                  <td className="px-5 py-3 text-center">
  <button
    onClick={() => deleteCustomer(c.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium"
  >
    Delete
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <Modal
          title="Add Customer"
          onClose={() =>
            setShowModal(false)
          }
        >
          <div className="space-y-3">
            {["name", "email", "phone"].map(
              (field) => (
                <div key={field}>
                  <label className="text-xs text-muted capitalize block mb-1">
                    {field}
                  </label>

                  <input
                    value={form[field]}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        [field]:
                          e.target.value,
                      }))
                    }
                    placeholder={
                      field === "name"
                        ? "Full name"
                        : field === "email"
                        ? "email@example.com"
                        : "+91 XXXXX XXXXX"
                    }
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              )
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </Button>

              <Button
                onClick={addCustomer}
              >
                Add Customer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}