import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Users, TrendingUp } from "lucide-react";
import StatCard from "../components/ui/StatCard";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name) => {
  const colors = [
    "bg-gradient-cyan",
    "bg-gradient-purple",
    "bg-gradient-pink",
    "bg-gradient-lime",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const getSpendBadgeGradient = (spent) => {
  if (spent > 10000) return "bg-gradient-neon";
  if (spent > 5000) return "bg-gradient-purple";
  if (spent > 1000) return "bg-gradient-cyan";
  return "bg-gradient-lime";
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

  const totalSpent = customers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
  const avgSpent = customers.length > 0 ? Math.round(totalSpent / customers.length) : 0;

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Customers"
          value={customers.length}
          delta={`${filtered.length} shown`}
          icon={Users}
          accent="brand"
        />
        <StatCard
          label="Total Spent"
          value={`₹${totalSpent.toLocaleString()}`}
          delta={`₹${avgSpent} average`}
          icon={TrendingUp}
          accent="green"
        />
        <StatCard
          label="VIP Customers"
          value={customers.filter((c) => c.segment === "VIP").length}
          delta="Premium members"
          icon={Users}
          accent="amber"
        />
        <StatCard
          label="Active Customers"
          value={customers.filter((c) => c.segment === "Active").length}
          delta="Currently engaged"
          icon={Users}
          accent="rose"
        />
      </div>

      {/* Search Bar and Add Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex-1 flex items-center gap-2 bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 hover:border-white/20 transition-all duration-300 focus-within:border-brand-500">
          <Search size={16} className="text-muted flex-shrink-0" />
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name, email, or phone..."
            className="bg-transparent text-sm text-white placeholder:text-muted outline-none w-full"
          />
        </div>

        <Button
          onClick={() => setShowModal(true)}
          size="md"
        >
          <UserPlus size={14} />
          Add Customer
        </Button>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs text-muted font-medium"
      >
        Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
        <span className="text-white font-semibold">{customers.length}</span> customers
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group relative"
      >
        <div className="absolute inset-0 bg-gradient-cyan opacity-0 group-hover:opacity-5 blur-xl rounded-2xl transition-opacity duration-500" />
        
        <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-transparent border-t-brand-500"
              />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Users size={40} className="text-muted/30 mb-4" />
              <p className="text-muted text-sm">No customers found</p>
              <p className="text-muted/50 text-xs">Try adjusting your search or add new customers</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-4 font-semibold">Customer</th>
                    <th className="text-left px-6 py-4 font-semibold">Email</th>
                    <th className="text-left px-6 py-4 font-semibold">Phone</th>
                    <th className="text-center px-6 py-4 font-semibold">Orders</th>
                    <th className="text-right px-6 py-4 font-semibold">Lifetime Value</th>
                    <th className="text-center px-6 py-4 font-semibold">Segment</th>
                    <th className="text-center px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filtered.map((customer, idx) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-white/5 transition-colors duration-300 group/row"
                    >
                      {/* Avatar and Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-10 h-10 rounded-lg ${getAvatarColor(customer.name)} flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-lg`}
                          >
                            {getInitials(customer.name)}
                          </motion.div>
                          <div className="flex-1">
                            <p className="font-medium text-white">{customer.name}</p>
                            <p className="text-xs text-muted/70">ID: {customer.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted hover:text-white transition-colors">
                          {customer.email}
                        </p>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted">
                          {customer.phone}
                        </p>
                      </td>

                      {/* Orders */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 font-mono text-sm font-semibold">
                          {customer.total_orders || 0}
                        </div>
                      </td>

                      {/* Lifetime Value */}
                      <td className="px-6 py-4 text-right">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`inline-block px-3 py-1.5 rounded-lg ${getSpendBadgeGradient(customer.total_spent || 0)} text-white text-sm font-mono font-semibold`}
                        >
                          ₹{(customer.total_spent || 0).toLocaleString()}
                        </motion.div>
                      </td>

                      {/* Segment */}
                      <td className="px-6 py-4 text-center">
                        <Badge
                          label={customer.segment || "Unassigned"}
                          color={
                            segColor[customer.segment] ??
                            "muted"
                          }
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deleteCustomer(customer.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all duration-300 text-xs font-medium opacity-0 group-hover/row:opacity-100"
                        >
                          Remove
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

     {showModal && (
  <Modal
    title="Add New Customer"
    onClose={() => setShowModal(false)}
  >
    <div className="space-y-4">
      {["name", "email", "phone"].map((field) => (
        <div key={field}>
          <label className="text-xs text-muted block mb-2 font-medium capitalize">
            {field === "name"
              ? "Full Name"
              : field === "email"
              ? "Email Address"
              : "Phone Number"}
          </label>

          <input
            value={form[field]}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                [field]: e.target.value,
              }))
            }
            placeholder={
              field === "name"
                ? "e.g., John Doe"
                : field === "email"
                ? "john@example.com"
                : "+91 98765 43210"
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted/50 focus:border-brand-500 focus:outline-none"
          />
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>

        <Button onClick={addCustomer}>
          <UserPlus size={13} />
          Add Customer
        </Button>
      </div>
    </div>
  </Modal>
)}
    </motion.div>
  );
}
