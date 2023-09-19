import { Router } from "express";

import emprestimosRoutes from "./emprestimos.routes";
import generosRoutes from "./generos.routes";
import livrosRoutes from "./livros.routes";
import usuariosRoutes from "./usuarios.routes";

const app = Router();

app.use("/emprestimos", emprestimosRoutes);
app.use("/generos", generosRoutes);
app.use("/livros", livrosRoutes);
app.use("/usuarios", usuariosRoutes);

export default app;
