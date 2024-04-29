import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'Categories',
})
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    validate: {
      len: [0, 50],
    },
    comment: '카테고리 이름',
  })
  name: string;

  @Default(DataType.NOW)
  @CreatedAt
  @Column
  createdAt: Date;

  @Default(DataType.NOW)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
