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

import { Livro } from ".";

@Table
export default class DetalhesLivro extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  sinopse!: string;

  @Column(DataType.STRING)
  primeiraFrase!: string;

  @ForeignKey(() => Livro)
  @Column(DataType.INTEGER)
  livroId!: number;

  @BelongsTo(() => Livro)
  livro!: Livro;
}
