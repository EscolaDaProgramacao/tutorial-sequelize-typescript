import { Sequelize } from "sequelize-typescript";

import seedDatabase from "./seeds";
import {
  DetalhesLivro,
  Emprestimo,
  Genero,
  Livro,
  LivroGenero,
  Usuario,
} from "./models";

const models = [DetalhesLivro, Emprestimo, Genero, Livro, LivroGenero, Usuario];

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  models,
});

export const runSeeds = seedDatabase;
