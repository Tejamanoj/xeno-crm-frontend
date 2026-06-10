import { useState, useEffect } from "react";
import { Users, Megaphone, Send, TrendingUp } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { api } from "../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_customers: 0,
    total_segments: 0,
    total_campaigns: 0,
    total_sent: 0,
    total_opened: 0,
  });

  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const analytics = await api.getAnalytics();
        const trendData = await api.getTrend();

        setStats({
          total_customers: analytics.total_customers || 0,
          total_segments: analytics.total_segments || 0,
          total_campaigns: analytics.total_campaigns || 0,
          total_sent: analytics.total_sent || 0,
          total_opened: analytics.total_opened || 0,
        });

        setTrend(
          trendData.map((item) => ({
            day: item.day,
            sent: item.sent,
            opened: item.opened,
          }))
        );
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-muted">
        Loading Dashboard...
      </div>
    );
  }

  return (
    
    <div className="space-y-6">
      {/* Stats Cards */}
      
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Customers"
          value={stats.total_customers.toLocaleString()}
          delta="Live Data"
          icon={Users}
          accent="brand"
        />

        <StatCard
          label="Active Segments"
          value={stats.total_segments.toLocaleString()}
          delta="Live Data"
          icon={TrendingUp}
          accent="green"
        />

        <StatCard
          label="Campaigns"
          value={stats.total_campaigns.toLocaleString()}
          delta="Live Data"
          icon={Megaphone}
          accent="amber"
        />

        <StatCard
          label="Messages Sent"
          value={stats.total_sent.toLocaleString()}
          delta="Live Data"
          icon={Send}
          accent="rose"
        />
      </div>

      {/* Trend Chart */}
      <div className="bg-panel border border-border rounded-xl p-5">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
          Campaign Trend
        </p>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="gSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f6ef7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f6ef7" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="gOpen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
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

            <Area
              type="monotone"
              dataKey="sent"
              stroke="#4f6ef7"
              fill="url(#gSent)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="opened"
              stroke="#34d399"
              fill="url(#gOpen)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* System Overview */}
      <div className="bg-panel border border-border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">
          System Overview
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-lg p-4">
            <p className="text-muted text-sm">
              Total Opened Messages
            </p>

            <p className="text-2xl font-bold text-green-400">
              {stats.total_opened}
            </p>
          </div>

          <div className="bg-surface rounded-lg p-4">
            <p className="text-muted text-sm">
              Open Rate
            </p>

            <p className="text-2xl font-bold text-blue-400">
              {stats.total_sent > 0
                ? Math.round(
                    (stats.total_opened / stats.total_sent) * 100
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}