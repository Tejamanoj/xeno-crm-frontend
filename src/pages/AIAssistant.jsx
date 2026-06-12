import { useState } from "react";
import { api } from "../lib/api";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [deliveryStats, setDeliveryStats] = useState(null);

  const generateCampaign = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const campaign = await api.generateAI(prompt);

      if (campaign.error) {
        alert(campaign.error);
        return;
      }

      setResult(campaign);
      setDeliveryStats(null);
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = () => {
    if (!result) return;

    const campaign = {
      id: Date.now(),
      name: "AI Generated Campaign",
      audience: result.audience,
      channel: result.channel,
      score: result.score,
      message: result.message,
      status: "Draft",
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "generatedCampaign",
      JSON.stringify(campaign)
    );

    alert("Campaign created successfully!");
  };

  const launchCampaign = () => {
    if (!result) return;

    const stats = {
      sent: Math.floor(Math.random() * 50) + 150,
      delivered: Math.floor(Math.random() * 40) + 120,
      opened: Math.floor(Math.random() * 30) + 80,
      clicked: Math.floor(Math.random() * 20) + 20,
      failed: Math.floor(Math.random() * 10),
    };

    setDeliveryStats(stats);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          AI Campaign Assistant
        </h1>

        <p className="text-muted mt-2">
          Generate customer campaigns using natural language.
        </p>
      </div>

      <div className="bg-panel border border-border rounded-xl p-6">
        <label className="block text-sm mb-2">
          Campaign Goal
        </label>

        <textarea
          className="w-full bg-surface border border-border rounded-lg p-4 min-h-[140px]"
          placeholder="Example: Create a campaign for VIP customers"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateCampaign}
          className="mt-4 bg-brand-500 text-white px-5 py-2 rounded-lg"
        >
          Generate Campaign
        </button>
      </div>

      {loading && (
        <div className="bg-panel border border-border rounded-xl p-6">
          <p>AI is generating recommendations...</p>
        </div>
      )}

      {result && (
        <div className="bg-panel border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            AI Recommendation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">
                Audience Size
              </p>
              <p className="text-2xl font-bold">
                {result.audience}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">
                Best Channel
              </p>
              <p className="text-2xl font-bold">
                {result.channel}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">
                Campaign Score
              </p>
              <p className="text-2xl font-bold">
                {result.score}%
              </p>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">
              Suggested Message
            </p>

            <div className="bg-surface border border-border rounded-lg p-4">
              {result.message}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={createCampaign}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Create Campaign
            </button>

            <button
              onClick={launchCampaign}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Launch Campaign
            </button>
          </div>

          {deliveryStats && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Campaign Delivery Report
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-muted">Sent</p>
                  <p className="text-2xl font-bold">
                    {deliveryStats.sent}
                  </p>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-muted">
                    Delivered
                  </p>
                  <p className="text-2xl font-bold">
                    {deliveryStats.delivered}
                  </p>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-muted">Opened</p>
                  <p className="text-2xl font-bold">
                    {deliveryStats.opened}
                  </p>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-muted">Clicked</p>
                  <p className="text-2xl font-bold">
                    {deliveryStats.clicked}
                  </p>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-muted">Failed</p>
                  <p className="text-2xl font-bold">
                    {deliveryStats.failed}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}