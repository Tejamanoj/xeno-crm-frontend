import { useState, useEffect } from "react";
import { Plus, Users, Sparkles } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { api } from "../lib/api";

const aiSuggestions = [
  "Customers who bought more than 3 times in last 90 days",
  "Users who haven't opened any message in 30 days",
  "Shoppers who spent between ₹2000 and ₹5000",
  "New customers acquired this month",
];

export default function Segments() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    channel: "Email",
  });

  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        setLoading(true);

        const data = await api.getSegments();

        setSegments(data || []);
      } catch (error) {
        console.error("Segments Error:", error);
        setSegments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSegments();
  }, []);

  function handleAiSuggest(suggestion) {
    setAiLoading(true);

    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        name: suggestion.split(" ").slice(0, 4).join(" "),
        description: suggestion,
      }));

      setAiLoading(false);
    }, 1000);
  }

  async function addSegment() {
    if (!form.name) return;

    try {
      const newSegment = await api.addSegment(form);

      if (!newSegment.error) {
        setSegments((prev) => [newSegment, ...prev]);

        setForm({
          name: "",
          description: "",
          channel: "Email",
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
          {segments.length} segments total
        </p>

        <Button onClick={() => setShowModal(true)} size="md">
          <Plus size={14} />
          New Segment
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-muted py-10 text-sm">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className="bg-panel border border-border rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-white">
                  {segment.name}
                </p>

                <Badge
                  label={segment.channel}
                  color="blue"
                />
              </div>

              <p className="text-xs text-muted leading-relaxed">
                {segment.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Users size={12} />
                  <span className="font-mono text-white">
                    {(segment.count || 0).toLocaleString()}
                  </span>
                  customers
                </div>

                <Button variant="outline" size="sm">
                  Use Segment
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal
          title="Create Segment"
          onClose={() => setShowModal(false)}
        >
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles
                  size={13}
                  className="text-brand-500"
                />
                <span className="text-xs font-medium text-brand-500">
                  AI Suggestions
                </span>
              </div>

              <div className="space-y-1.5">
                {aiSuggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAiSuggest(item)
                    }
                    className="w-full text-left text-xs text-muted hover:text-white hover:bg-white/5 px-2 py-1.5 rounded transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">
                Segment Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder={
                  aiLoading
                    ? "AI is thinking..."
                    : "e.g. VIP Shoppers"
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
                {["Email", "WhatsApp", "SMS", "RCS"].map(
                  (channel) => (
                    <option key={channel}>
                      {channel}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
                placeholder="Describe who should be in this segment..."
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>

              <Button onClick={addSegment}>
                Create Segment
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}