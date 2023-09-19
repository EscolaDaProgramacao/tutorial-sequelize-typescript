import { Router } from "express";

import { DetalhesLivro, Genero, Livro, LivroGenero } from "../database/models";

const router = Router();

// Criar Livro
router.post("/", async (req, res) => {
  try {
    const livro = await Livro.create(
      { ...req.body, disponivel: true },
      {
        include: [DetalhesLivro],
      }
    );
    res.json(livro);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar Livros
router.get("/", async (_req, res) => {
  try {
    const livros = await Livro.findAll({ include: [DetalhesLivro, Genero] });
    res.json(livros);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Associar um gênero a um livro
router.post("/:idLivro/generos/:idGenero", async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.idLivro);
    const genero = await Genero.findByPk(req.params.idGenero);

    if (!livro || !genero) {
      res.status(404).json({ error: "Livro ou gênero não encontrado" });
      return;
    }

    await livro.$add("generos", genero);
    res.json({ message: "Gênero associado ao livro com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os gêneros de um livro específico
router.get("/:id/generos", async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id, {
      include: [Genero],
    });

    if (!livro) {
      res.status(404).json({ error: "Livro não encontrado" });
      return;
    }

    res.json(livro.generos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
