import { useState, useEffect } from "react";
import { Plus, Send, Sparkles, RefreshCw } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { api } from "../lib/api";

const statusColor = {
  completed: "green",
  sending: "amber",
  scheduled: "blue",
  draft: "muted",
};

const aiMessages = [
  "Hey {name}! 🎉 Your exclusive deal is waiting — shop now and save 20% on everything!",
  "We miss you, {name}! Come back and discover what's new. Use code COMEBACK for ₹200 off.",
  "Hi {name}, as a valued member you get first access to our new collection. Tap to explore!",
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [communications, setCommunications] = useState([]);

  const [form, setForm] = useState({
    name: "",
    segment_name: "",
    channel: "WhatsApp",
    message: "",
  });

  const [generating, setGenerating] = useState(false);

  async function fetchCampaigns() {
    try {
      setLoading(true);

      const data = await api.getCampaigns();

      let campaignsData = Array.isArray(data)
        ? data
        : data.campaigns || [];

      const savedCampaign =
        localStorage.getItem("generatedCampaign");

      if (savedCampaign) {
        const aiCampaign = JSON.parse(savedCampaign);

        campaignsData = [
          {
            id: aiCampaign.id,
            name: aiCampaign.name,
            segment_name: "AI Generated Segment",
            channel: aiCampaign.channel,
            sent: aiCampaign.audience,
            opened: Math.floor(aiCampaign.audience * 0.7),
            clicked: Math.floor(aiCampaign.audience * 0.25),
            status: "draft",
          },
          ...campaignsData,
        ];
      }

      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Campaign Error:", error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const loadData = async () => {
    await fetchCampaigns();
  };

  loadData();
}, []);

  const viewDetails = async (campaignId) => {
    try {
      const data =
        await api.getCampaignCommunications(
          campaignId
        );

      setCommunications(data || []);
      setSelectedCampaign(campaignId);
    } catch (err) {
      console.error("Communication Error:", err);
    }
  };

  function generateMessage() {
    setGenerating(true);

    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        message:
          aiMessages[
            Math.floor(
              Math.random() * aiMessages.length
            )
          ],
      }));

      setGenerating(false);
    }, 1000);
  }

  async function launchCampaign() {
    if (!form.name) return;

    try {
      const newCampaign =
        await api.addCampaign(form);

      if (!newCampaign.error) {
        setCampaigns((prev) => [
          newCampaign,
          ...prev,
        ]);

        setForm({
          name: "",
          segment_name: "",
          channel: "WhatsApp",
          message: "",
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {campaigns.length} campaigns total
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              window.location.reload()
            }
            size="md"
          >
            <RefreshCw size={13} />
            Refresh
          </Button>

          <Button
            onClick={() => setShowModal(true)}
            size="md"
          >
            <Plus size={14} />
            New Campaign
          </Button>
        </div>
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
                  Campaign
                </th>
                <th className="text-left px-5 py-3">
                  Segment
                </th>
                <th className="text-left px-5 py-3">
                  Channel
                </th>
                <th className="text-right px-5 py-3">
                  Sent
                </th>
                <th className="text-right px-5 py-3">
                  Opened
                </th>
                <th className="text-right px-5 py-3">
                  Clicked
                </th>
                <th className="text-center px-5 py-3">
                  Status
                </th>
                <th className="text-center px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border/50 hover:bg-white/5"
                >
                  <td className="px-5 py-3 text-white font-medium">
                    {c.name}
                  </td>

                  <td className="px-5 py-3 text-muted text-xs">
                    {c.segment_name}
                  </td>

                  <td className="px-5 py-3 text-muted text-xs">
                    {c.channel}
                  </td>

                  <td className="px-5 py-3 text-right text-white">
                    {c.sent || 0}
                  </td>

                  <td className="px-5 py-3 text-right text-emerald-400">
                    {c.opened || 0}
                  </td>

                  <td className="px-5 py-3 text-right text-brand-500">
                    {c.clicked || 0}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <Badge
                      label={c.status}
                      color={
                        statusColor[c.status]
                      }
                    />
                  </td>

                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() =>
                        viewDetails(c.id)
                      }
                      className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedCampaign && (
        <div className="bg-panel border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Campaign Communications
            </h3>

            <button
              onClick={() => {
                setSelectedCampaign(null);
                setCommunications([]);
              }}
              className="text-red-400"
            >
              Close
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2">
                  Customer
                </th>
                <th className="text-left py-2">
                  Channel
                </th>
                <th className="text-left py-2">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {communications.map((comm) => (
                <tr
                  key={comm.id}
                  className="border-t border-border"
                >
                  <td className="py-2 text-white">
                    {comm.customer_name}
                  </td>

                  <td className="py-2 text-muted">
                    {comm.channel}
                  </td>

                  <td className="py-2">
                    {comm.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal
          title="New Campaign"
          onClose={() =>
            setShowModal(false)
          }
        >
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted block mb-1">
                Campaign Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">
                Target Segment
              </label>

              <input
                value={form.segment_name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    segment_name:
                      e.target.value,
                  }))
                }
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">
                Channel
              </label>

              <select
                value={form.channel}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    channel: e.target.value,
                  }))
                }
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              >
                {[
                  "WhatsApp",
                  "Email",
                  "SMS",
                  "RCS",
                ].map((ch) => (
                  <option key={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-muted">
                  Message
                </label>

                <button
                  onClick={generateMessage}
                  className="flex items-center gap-1 text-xs text-brand-500"
                >
                  <Sparkles size={11} />
                  {generating
                    ? "Generating..."
                    : "AI Write"}
                </button>
              </div>

              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    message:
                      e.target.value,
                  }))
                }
                rows={3}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </Button>

              <Button
                onClick={launchCampaign}
              >
                <Send size={13} />
                Launch
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}