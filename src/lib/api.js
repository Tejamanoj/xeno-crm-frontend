

const BASE = "https://xeno-crm-backend-c3k2.onrender.com/api";

export const api = {
  // Customers
  getCustomers:  () => fetch(`${BASE}/customers`).then(r => r.json()),
  addCustomer:   (data) => fetch(`${BASE}/customers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteCustomer:(id)   => fetch(`${BASE}/customers/${id}`, { method: "DELETE" }).then(r => r.json()),

  // Segments
  getSegments:   () => fetch(`${BASE}/segments`).then(r => r.json()),
  addSegment:    (data) => fetch(`${BASE}/segments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),

  // Campaigns
  getCampaigns:  () => fetch(`${BASE}/campaigns`).then(r => r.json()),
  addCampaign:   (data) => fetch(`${BASE}/campaigns`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),

  // Analytics
// Analytics
getAnalytics: () =>
  fetch(`${BASE}/analytics`).then(r => r.json()),

getTrend: () =>
  fetch(`${BASE}/analytics/trend`).then(r => r.json()),
};