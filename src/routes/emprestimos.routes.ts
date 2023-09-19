import { Router } from "express";
import { Op } from "sequelize";

import { Emprestimo, Livro, Usuario } from "../database/models";

const router = Router();

function calcularDataPrevistaDevolucao(data: Date): Date {
  let dataPrevista = new Date(data);
  dataPrevista.setDate(dataPrevista.getDate() + 7); // Adicionar 7 dias

  // Verificar se é sábado ou domingo e ajustar para segunda-feira
  if (dataPrevista.getDay() === 6) {
    // Sábado
    dataPrevista.setDate(dataPrevista.getDate() + 2);
  } else if (dataPrevista.getDay() === 0) {
    // Domingo
    dataPrevista.setDate(dataPrevista.getDate() + 1);
  }

  return dataPrevista;
}

// Realizar um novo empréstimo
router.post("/", async (req, res) => {
  const { usuarioId, livroId } = req.body;

  try {
    // Verificar se o livro está disponível
    const livro = await Livro.findByPk(livroId);
    if (!livro || !livro.disponivel) {
      res
        .status(400)
        .json({ error: "O livro não está disponível para empréstimo" });
      return;
    }

    const dataEmprestimo = new Date();
    const dataPrevistaDevolucao = calcularDataPrevistaDevolucao(dataEmprestimo);

    const emprestimo = await Emprestimo.create({
      usuarioId,
      livroId,
      dataEmprestimo,
      dataPrevistaDevolucao,
    });

    // Atualizar status do livro para "indisponível"
    livro.disponivel = false;
    await livro.save();

    res.json(emprestimo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Realizar uma devolução
router.post("/:id/devolver", async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findByPk(req.params.id);
    if (!emprestimo) {
      res.status(404).json({ error: "Empréstimo não encontrado" });
      return;
    }

    // Apenas setamos a data de devolução para agora
    emprestimo.dataEfetivaDevolucao = new Date();
    await emprestimo.save();

    // Marcar o livro como disponível novamente
    const livro = await emprestimo.$get("livro");
    if (!livro) {
      res.status(404).json({ error: "Livro não encontrado" });
      return;
    }

    livro.disponivel = true;
    await livro.save();

    res.json({ message: "Livro devolvido com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar empréstimos com devolução em atraso
router.get("/atrasados", async (req, res) => {
  try {
    const hoje = new Date();
    const emprestimos = await Emprestimo.findAll({
      where: {
        dataPrevistaDevolucao: {
          [Op.lt]: hoje, // Menor que hoje (less than)
        },
        dataEfetivaDevolucao: null, // O livro ainda não foi devolvido
      },
      include: [Livro, Usuario],
    });
    res.json(emprestimos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar empréstimos com devolução em atraso de um usuário específico
router.get("/atrasados/:usuarioId", async (req, res) => {
  try {
    const hoje = new Date();
    const emprestimos = await Emprestimo.findAll({
      where: {
        usuarioId: req.params.usuarioId,
        dataPrevistaDevolucao: {
          [Op.lt]: hoje, // Menor que hoje (less than)
        },
        dataEfetivaDevolucao: null, // O livro ainda não foi devolvido
      },
      include: [Livro, Usuario],
    });
    res.json(emprestimos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
