import "reflect-metadata";
import express from "express";

import { sequelize, runSeeds } from "./database";

import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Conectar ao banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  runSeeds()
    .then(() => {
      console.log("Seeding concluído!");
    })
    .catch((error) => {
      console.error("Erro durante a seed:", error);
    });
});
