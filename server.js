import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const AMO_DOMAIN = "liansoft.amocrm.ru";
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

app.post("/email-read", async (req, res) => {
  console.log("Webhook received:", req.body);

  const leadId = req.body.lead_id || req.body.entity_id;
  if (!leadId) return res.status(400).send("lead_id not found");

  try {
    await axios.post(
      `https://${AMO_DOMAIN}/api/v4/tasks`,
      [{
        entity_id: leadId,
        entity_type: "leads",
        text: "Письмо прочитано. Связаться с клиентом!",
        complete_till: Math.floor(Date.now() / 1000) + 3600
      }],
      { headers: { Authorization: `Bearer ${DuOT9p50vyY12lnS4BYcfra8geGhUNGeEN0VIWILhYnBsh3bvmhJIGiiFFdr4Ehp}` } }
    );
    res.send("Task created");
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Server running"));
