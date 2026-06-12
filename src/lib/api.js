const BASE = "https://xeno-crm-backend-c3k2.onrender.com/api";

export const api = {
  // Customers
  getCustomers: () =>
    fetch(`${BASE}/customers`).then((r) => r.json()),

  addCustomer: (data) =>
    fetch(`${BASE}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteCustomer: (id) =>
    fetch(`${BASE}/customers/${id}`, {
      method: "DELETE",
    }).then((r) => r.json()),

  // Segments
  getSegments: () =>
    fetch(`${BASE}/segments`).then((r) => r.json()),

  addSegment: (data) =>
    fetch(`${BASE}/segments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  // Campaigns
  getCampaigns: () =>
    fetch(`${BASE}/campaigns`).then((r) => r.json()),

  addCampaign: (data) =>
    fetch(`${BASE}/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  // Orders
  getOrders: () =>
    fetch(`${BASE}/orders`).then((r) => r.json()),

  // Analytics
  getAnalytics: () =>
    fetch(`${BASE}/analytics`).then((r) => r.json()),

  getTrend: () =>
    fetch(`${BASE}/analytics/trend`).then((r) => r.json()),

  // AI
  generateAI: (prompt) =>
    fetch(`${BASE}/ai/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    }).then((r) => r.json()),
};