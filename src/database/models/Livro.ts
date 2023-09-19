import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { DetalhesLivro, Genero, LivroGenero } from ".";

@Table
export default class Livro extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  titulo!: string;

  @Column(DataType.BOOLEAN)
  disponivel!: boolean;

  @HasOne(() => DetalhesLivro)
  detalhes!: DetalhesLivro;

  @BelongsToMany(() => Genero, () => LivroGenero)
  generos!: Genero[];
}
