import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  BeforeCreate,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import passwordHash from 'src/common/utils/passwordHash';

import { Post } from './post.model';

@Table({
  tableName: 'Users',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [0, 50],
    },
    comment: '사용자 이름',
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
    comment: '비밀번호',
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '로그인 유형',
  })
  login_type: string;

  @Column({
    type: DataType.STRING,
    comment: '표시 이름',
  })
  displayname: string;

  @Default(DataType.NOW)
  @CreatedAt
  @Column
  createdAt: Date;

  @Default(DataType.NOW)
  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(() => Post, {
    through: 'LikesPosts',
    as: 'Likes',
    foreignKey: 'user_id',
    otherKey: 'post_id',
    constraints: false,
  })
  likes: Post[];

  @BeforeCreate
  static hashPassword(user: User): void {
    user.password = passwordHash(user.password);
  }
}
