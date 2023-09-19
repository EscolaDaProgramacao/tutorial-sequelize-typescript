import { Router } from "express";

import { Emprestimo, Livro, Usuario } from "../database/models";

const router = Router();

// Criar Usuário
router.post("/", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar Usuários
router.get("/", async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar Empréstimos
router.get("/:id/emprestimos", async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll({
      where: { usuarioId: req.params.id },
      include: [Livro, Usuario],
    });
    res.json(emprestimos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
