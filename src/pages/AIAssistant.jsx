import { useState } from "react";
import { api } from "../lib/api";

export default function AIAssistant() {
  const [prompt, setPrompt]           = useState("");
  const [loading, setLoading]         = useState(false);
  const [launching, setLaunching]     = useState(false);
  const [result, setResult]           = useState(null);
  const [launched, setLaunched]       = useState(null);
  const [campaignName, setCampaignName] = useState("AI Generated Campaign");

  async function generateCampaign() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    setLaunched(null);
    try {
      const data = await api.generateAI(prompt);
      if (data.error) { alert(data.error); return; }
      setResult(data);
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI generation failed");
    } finally {
      setLoading(false);
    }
  }

  // Determine segment from result channel/prompt
  function inferSegment() {
    const t = prompt.toLowerCase();
    if (t.includes("vip") || t.includes("premium"))       return "VIP Shoppers";
    if (t.includes("new customer") || t.includes("first")) return "New This Month";
    if (t.includes("inactive") || t.includes("lapsed"))    return "Lapsed Customers";
    return "Active Buyers";
  }

  async function launchCampaign() {
    if (!result) return;
    setLaunching(true);
    try {
      const payload = {
        name:         campaignName,
        segment_name: inferSegment(),
        channel:      result.channel,
        message:      result.message,
      };
      const campaign = await api.addCampaign(payload);
      if (campaign.error) { alert(campaign.error); return; }
      setLaunched(campaign);
    } catch (err) {
      console.error("Launch error:", err);
      alert("Failed to launch campaign");
    } finally {
      setLaunching(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Campaign Assistant</h1>
        <p className="text-muted mt-2">Generate customer campaigns using natural language.</p>
      </div>

      {/* Prompt input */}
      <div className="bg-panel border border-border rounded-xl p-6">
        <label className="block text-sm mb-2">Campaign Goal</label>
        <textarea
          className="w-full bg-surface border border-border rounded-lg p-4 min-h-[140px] text-white"
          placeholder="Example: Create a campaign for VIP customers who haven't engaged in 30 days"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={generateCampaign}
          disabled={loading}
          className="mt-4 bg-brand-500 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Campaign"}
        </button>
      </div>

      {/* AI Recommendation */}
      {result && (
        <div className="bg-panel border border-border rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">AI Recommendation</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Audience Size</p>
              <p className="text-2xl font-bold">{result.audience}</p>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Best Channel</p>
              <p className="text-2xl font-bold">{result.channel}</p>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Campaign Score</p>
              <p className="text-2xl font-bold">{result.score}%</p>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Suggested Message</p>
            <div className="bg-surface border border-border rounded-lg p-4 text-white">
              {result.message}
            </div>
          </div>

          {/* Campaign name input */}
          <div>
            <label className="text-xs text-muted block mb-1">Campaign Name</label>
            <input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="text-xs text-muted">
            Target Segment: <span className="text-white font-medium">{inferSegment()}</span>
          </div>

          <button
            onClick={launchCampaign}
            disabled={launching}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {launching ? "Launching..." : "Launch Campaign"}
          </button>
        </div>
      )}

      {/* Launch result */}
      {launched && (
        <div className="bg-panel border border-green-500/30 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-green-400">✅ Campaign Launched!</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Sent</p>
              <p className="text-2xl font-bold text-white">{launched.sent || 0}</p>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Opened</p>
              <p className="text-2xl font-bold text-emerald-400">{launched.opened || 0}</p>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Clicked</p>
              <p className="text-2xl font-bold text-brand-400">{launched.clicked || 0}</p>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">Failed</p>
              <p className="text-2xl font-bold text-red-400">{launched.failed || 0}</p>
            </div>
          </div>
          <p className="text-xs text-muted">
            Campaign is now visible on the <span className="text-white">Campaigns page</span>.
          </p>
        </div>
      )}
    </div>
  );
}