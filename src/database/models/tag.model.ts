import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { Post } from './post.model';

@Table({
  tableName: 'Tags',
})
export class Tag extends Model {
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
    comment: '태그 이름',
  })
  name: string;

  @BelongsToMany(() => Post, {
    through: 'TagsPosts',
    as: 'Posts',
    foreignKey: 'tag_id',
    otherKey: 'post_id',
    constraints: false,
  })
  posts: Post[];

  @Default(DataType.NOW)
  @CreatedAt
  @Column
  createdAt: Date;

  @Default(DataType.NOW)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
