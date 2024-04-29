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
  tableName: 'Companies',
})
export class Company extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Column({
    type: DataType.STRING,
    comment: '로고 사진',
  })
  logo_url: string;

  @Column({
    type: DataType.STRING(200),
    comment: '회사명',
    allowNull: false,
    validate: {
      len: [0, 50],
      notEmpty: {
        msg: 'The name cannot be empty or consist only of spaces.',
      },
    },
  })
  name: string;

  @Column({
    type: DataType.ENUM('ACTIVE', 'INACTIVE'),
    comment: '해당 회사계정이 활성화 되었는지 유무',
    defaultValue: 'INACTIVE',
    allowNull: false,
  })
  state: string;

  @Default(DataType.NOW)
  @CreatedAt
  @Column
  createdAt: Date;

  @Default(DataType.NOW)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
