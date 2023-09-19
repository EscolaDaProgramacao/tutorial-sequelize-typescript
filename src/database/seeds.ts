import { sequelize } from ".";
import { Usuario, Livro, Emprestimo, Genero } from "./models";

export default async function seedDatabase() {
  const user1 = await Usuario.create({ nome: "João" });
  const user2 = await Usuario.create({ nome: "Maria" });

  const genero1 = await Genero.create({ nome: "Ficção" });
  const genero2 = await Genero.create({ nome: "História" });

  const livro1 = await Livro.create({ titulo: "1984", disponivel: false });
  const livro2 = await Livro.create({
    titulo: "História do Brasil",
    disponivel: true,
  });

  await livro1.$add("generos", genero1);
  await livro2.$add("generos", genero2);

  await Emprestimo.create({
    usuarioId: user1.id,
    livroId: livro1.id,
    dataEmprestimo: new Date(2023, 3, 23),
    dataPrevistaDevolucao: new Date(2023, 4, 2),
  });
  await Emprestimo.create({
    usuarioId: user2.id,
    livroId: livro2.id,
    dataEmprestimo: new Date(2023, 5, 24),
    dataPrevistaDevolucao: new Date(2023, 6, 1),
    dataEfetivaDevolucao: new Date(2023, 5, 28),
  });
}
