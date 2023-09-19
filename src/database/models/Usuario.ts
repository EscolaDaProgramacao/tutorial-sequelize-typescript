import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Emprestimo } from ".";

@Table
export default class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nome!: string;

  @HasMany(() => Emprestimo)
  emprestimos!: Emprestimo[];
}
