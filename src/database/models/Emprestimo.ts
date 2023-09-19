import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Livro, Usuario } from ".";

@Table
export default class Emprestimo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Usuario)
  @Column(DataType.INTEGER)
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @ForeignKey(() => Livro)
  @Column(DataType.INTEGER)
  livroId!: number;

  @BelongsTo(() => Livro)
  livro!: Livro;

  @Column(DataType.DATE)
  dataEmprestimo!: Date;

  @Column(DataType.DATE)
  dataPrevistaDevolucao!: Date;

  @Column(DataType.DATE)
  dataEfetivaDevolucao?: Date;

  get atrasado(): boolean {
    const hoje = new Date();
    return hoje > this.dataPrevistaDevolucao;
  }
}
