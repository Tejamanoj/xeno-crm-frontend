import { useState } from "react";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateCampaign = () => {
    
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const text = prompt.toLowerCase();
      console.log("PROMPT:", text);

      let campaign;

      if (text.includes("vip")) {
        campaign = {
          audience: 120,
          channel: "WhatsApp",
          score: 96,
          message:
            "Hi {name}, as one of our VIP customers, enjoy an exclusive 25% discount on your next purchase.",
        };
      } else if (
        text.includes("inactive") ||
        text.includes("lapsed") ||
        text.includes("60 days")
      ) {
        campaign = {
          audience: 280,
          channel: "Email",
          score: 91,
          message:
            "Hi {name}, we miss you! Come back and enjoy ₹500 OFF on your next order using code COMEBACK.",
        };
      } else if (
        text.includes("new") ||
        text.includes("welcome")
      ) {
        campaign = {
          audience: 150,
          channel: "Email",
          score: 88,
          message:
            "Welcome {name}! Enjoy 15% OFF on your first purchase with us.",
        };
      } else if (
        text.includes("festival") ||
        text.includes("diwali")
      ) {
        campaign = {
          audience: 500,
          channel: "WhatsApp",
          score: 95,
          message:
            "Happy Diwali {name}! Celebrate with up to 40% OFF on selected products.",
        };
      } else if (text.includes("cart")) {
        campaign = {
          audience: 220,
          channel: "SMS",
          score: 90,
          message:
            "Hi {name}, your cart is waiting! Complete your purchase today and get free shipping.",
        };
      } else {
        campaign = {
          audience: 245,
          channel: "WhatsApp",
          score: 92,
          message:
            "Hi {name}, don't miss our latest offers and exclusive deals available for a limited time.",
        };
      }

      setResult(campaign);
      setLoading(false);
    }, 1200);
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

    alert("Campaign launched successfully!");
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
        </div>
      )}
    </div>
  );
}