const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let services = [
  { id: 1, name: "Lavagem simples", price: "30", time: "30min" },
  { id: 2, name: "Polimento", price: "150", time: "2h" },
];

app.get("/services", (req, res) => {
  res.json(services);
});

app.post("/services", (req, res) => {
  const newService = { id: Date.now(), ...req.body };
  services.push(newService);
  res.status(201).json(newService);
});

app.put("/services/:id", (req, res) => {
  const { id } = req.params;
  const index = services.findIndex(s => s.id == id);
  if (index !== -1) {
    services[index] = { ...services[index], ...req.body };
    res.json(services[index]);
  } else {
    res.status(404).json({ error: "Serviço não encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});