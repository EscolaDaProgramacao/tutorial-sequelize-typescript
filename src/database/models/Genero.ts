import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Livro, LivroGenero } from ".";

@Table
export default class Genero extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nome!: string;

  @BelongsToMany(() => Livro, () => LivroGenero)
  livros!: Livro[];
}
