import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Genero, Livro } from ".";

@Table
export default class LivroGenero extends Model {
  @PrimaryKey
  @ForeignKey(() => Livro)
  @Column(DataType.INTEGER)
  livroId!: number;

  @PrimaryKey
  @ForeignKey(() => Genero)
  @Column(DataType.INTEGER)
  generoId!: number;
}
