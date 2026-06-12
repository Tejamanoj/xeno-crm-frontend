import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Megaphone,
  Send,
  Eye,
  MousePointerClick,
  Zap,
  Sparkles,
} from "lucide-react";
import PremiumKPICard from "../components/ui/PremiumKPICard";
import StatCard from "../components/ui/StatCard";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import AIInsightCard from "../components/ui/AIInsightCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { api } from "../lib/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_customers: 0,
    total_segments: 0,
    total_campaigns: 0,
    total_sent: 0,
    total_opened: 0,
    total_clicked: 0,
    open_rate: 0,
    click_rate: 0,
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
          total_clicked: analytics.total_clicked || 0,
          open_rate: analytics.open_rate || 0,
          click_rate: analytics.click_rate || 0,
        });

        setTrend(
          trendData.map((item) => ({
            day: item.day,
            sent: item.sent,
            opened: item.opened,
            clicked: item.clicked || 0,
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
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonLoader count={4} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SkeletonLoader count={3} />
        </div>
      </motion.div>
    );
  }

  const openRate = stats.total_sent > 0 ? Math.round((stats.total_opened / stats.total_sent) * 100) : 0;
  const clickRate = stats.total_opened > 0 ? Math.round((stats.total_clicked / stats.total_opened) * 100) : 0;

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PremiumKPICard
          label="Total Customers"
          value={stats.total_customers.toLocaleString()}
          gradient="cyan"
          icon={Users}
          trend="up"
          delta="+12% from last month"
        />
        <PremiumKPICard
          label="Active Segments"
          value={stats.total_segments.toLocaleString()}
          gradient="purple"
          icon={Zap}
          trend="up"
          delta="+5 new segments"
        />
        <PremiumKPICard
          label="Total Campaigns"
          value={stats.total_campaigns.toLocaleString()}
          gradient="pink"
          icon={Megaphone}
          trend="up"
          delta="+3 campaigns"
        />
        <PremiumKPICard
          label="Messages Sent"
          value={stats.total_sent.toLocaleString()}
          gradient="lime"
          icon={Send}
          trend="up"
          delta="+24% engagement"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Opened"
          value={stats.total_opened.toLocaleString()}
          delta={`${openRate}% open rate`}
          icon={Eye}
          accent="green"
        />
        <StatCard
          label="Total Clicked"
          value={stats.total_clicked.toLocaleString()}
          delta={`${clickRate}% click rate`}
          icon={MousePointerClick}
          accent="brand"
        />
        <StatCard
          label="Open Rate %"
          value={`${openRate}%`}
          delta="Average rate"
          icon={TrendingUp}
          accent="amber"
        />
        <StatCard
          label="Click Rate %"
          value={`${clickRate}%`}
          delta="Engagement metric"
          icon={Sparkles}
          accent="rose"
        />
      </div>

      {/* AI Insight */}
      <AIInsightCard
        insight="WhatsApp campaigns are outperforming Email by 28%, with an average click rate of 42% vs 18%. Consider allocating more resources to WhatsApp messaging to maximize ROI."
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Campaign Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-cyan opacity-0 group-hover:opacity-10 blur-xl rounded-2xl transition-opacity duration-500" />
          <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                Campaign Performance
              </h3>
              <motion.div whileHover={{ scale: 1.1 }} className="text-brand-500">
                <TrendingUp size={18} />
              </motion.div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="gSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f6ef7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f6ef7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gOpen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="day"
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  stroke="transparent"
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  stroke="transparent"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 27, 46, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />

                <Area
                  type="monotone"
                  dataKey="sent"
                  stroke="#4f6ef7"
                  strokeWidth={3}
                  fill="url(#gSent)"
                  name="Messages Sent"
                />
                <Area
                  type="monotone"
                  dataKey="opened"
                  stroke="#34d399"
                  strokeWidth={3}
                  fill="url(#gOpen)"
                  name="Messages Opened"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Click Rate Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-purple opacity-0 group-hover:opacity-10 blur-xl rounded-2xl transition-opacity duration-500" />
          <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                Click Through Rate
              </h3>
              <motion.div whileHover={{ scale: 1.1 }} className="text-purple-500">
                <MousePointerClick size={18} />
              </motion.div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trend}>
                <defs>
                  <linearGradient id="gClick" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D946EF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D946EF" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="day"
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  stroke="transparent"
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  stroke="transparent"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 27, 46, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />

                <Line
                  type="monotone"
                  dataKey="clicked"
                  stroke="#D946EF"
                  strokeWidth={3}
                  dot={false}
                  name="Clicks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
          <p className="text-xs text-muted uppercase tracking-wide mb-3">Average Open Rate</p>
          <p className="text-3xl font-bold text-emerald-400">{openRate}%</p>
          <p className="text-xs text-muted mt-2">Among all campaigns</p>
        </div>

        <div className="bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
          <p className="text-xs text-muted uppercase tracking-wide mb-3">Average Click Rate</p>
          <p className="text-3xl font-bold text-blue-400">{clickRate}%</p>
          <p className="text-xs text-muted mt-2">Engagement strength</p>
        </div>

        <div className="bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
          <p className="text-xs text-muted uppercase tracking-wide mb-3">Conversion Potential</p>
          <p className="text-3xl font-bold text-amber-400">{Math.round(openRate * clickRate / 100)}%</p>
          <p className="text-xs text-muted mt-2">Combined potential</p>
        </div>
      </motion.div>
    </motion.div>
  );
}