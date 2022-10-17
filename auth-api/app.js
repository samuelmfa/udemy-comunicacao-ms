import express, { response } from "express";
import * as db from "./config/db/initialData.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.createInitialData();

app.get("/api/status", (req, res) => {
  return res.status(200).json({
    service: "Auth - API",
    status: "up",
  });
});

app.listen(PORT, () => {
  console.info(`Servidor iniciado na porta ${PORT}`);
});
