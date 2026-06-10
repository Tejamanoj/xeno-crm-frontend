import { useState } from "react";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateCampaign = () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setResult({
        audience: 245,
        channel: "WhatsApp",
        score: 92,
        message:
          "We miss you! It's been a while since your last purchase. Enjoy an exclusive 20% OFF on your next order.",
      });

      setLoading(false);
    }, 1500);
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
          placeholder="Example: Create a campaign for customers who spent more than ₹5000 and haven't purchased in 60 days"
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">
                Expected Open Rate
              </p>

              <p className="text-xl font-bold">
                85%
              </p>
            </div>

            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">
                Expected Conversion
              </p>

              <p className="text-xl font-bold">
                12%
              </p>
            </div>

            <div className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted">
                Revenue Potential
              </p>

              <p className="text-xl font-bold">
                ₹1,20,000
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium mb-2">
              AI Reasoning
            </p>

            <div className="bg-surface border border-border rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  These customers were previously active.
                </li>
                <li>
                  They have not purchased recently.
                </li>
                <li>
                  WhatsApp has the highest engagement
                  rate for this audience.
                </li>
                <li>
                  A limited-time discount improves
                  reactivation chances.
                </li>
              </ul>
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