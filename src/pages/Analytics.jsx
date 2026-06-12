import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { api } from "../lib/api";

const COLORS = ["#4f6ef7", "#34d399", "#fbbf24", "#f87171"];

export default function Analytics() {
  const [data, setData] = useState({
    total_sent: 0,
    total_opened: 0,
    total_clicked: 0,
    total_failed: 0,
    byChannel: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const d = await api.getAnalytics();
        setData(d);
      } catch (error) {
        console.error("Analytics error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-muted py-10 text-sm">
        Loading...
      </p>
    );
  }

  const deliveryData = [
    { name: "Sent", value: data.total_sent || 0 },
    { name: "Opened", value: data.total_opened || 0 },
    { name: "Clicked", value: data.total_clicked || 0 },
    { name: "Failed", value: data.total_failed || 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {deliveryData.map((item, i) => (
          <div
            key={item.name}
            className="bg-panel border border-border rounded-xl p-5"
          >
            <p className="text-xs text-muted uppercase tracking-wider mb-2">
              {item.name}
            </p>

            <p
              className="text-2xl font-bold font-mono"
              style={{ color: COLORS[i] }}
            >
              {item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-panel border border-border rounded-xl p-5">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
            Messages by Channel
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.byChannel || []}>
              <XAxis
                dataKey="channel"
                tick={{ fill: "#8892aa", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#8892aa", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="sent"
                fill="#4f6ef7"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="opened"
                fill="#34d399"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-panel border border-border rounded-xl p-5">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
            Delivery Breakdown
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={deliveryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                paddingAngle={3}
              >
                {deliveryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}