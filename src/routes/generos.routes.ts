import { Router } from "express";

import { Genero, Livro } from "../database/models";

const router = Router();

// Criar um novo gênero
router.post("/", async (req, res) => {
  try {
    const genero = await Genero.create(req.body);
    res.json(genero);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os gêneros
router.get("/", async (_req, res) => {
  try {
    const generos = await Genero.findAll();
    res.json(generos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar um gênero
router.put("/:id", async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);

    if (!genero) {
      res.status(404).json({ error: "Gênero não encontrado" });
      return;
    }

    await genero.update(req.body);
    res.json(genero);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Excluir um gênero
router.delete("/:id", async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);

    if (!genero) {
      res.status(404).json({ error: "Gênero não encontrado" });
      return;
    }

    await genero.destroy();
    res.json({ message: "Gênero excluído com sucesso" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os livros de um gênero específico
router.get("/:id/livros", async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id, {
      include: [Livro],
    });

    if (!genero) {
      res.status(404).json({ error: "Gênero não encontrado" });
      return;
    }

    res.json(genero.livros);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
