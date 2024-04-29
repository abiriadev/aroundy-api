import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';

import { Category } from './category.model';
import { Company } from './company.model';

@Table({
  tableName: 'Posts',
})
export class Post extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    comment: '게시글',
  })
  title: string;

  @Column({
    type: DataType.JSON,
    comment: '상점사진',
  })
  feed_urls: JSON;

  @Column({
    type: DataType.STRING,
    comment: '주소',
  })
  address: string;

  @Column({
    type: DataType.STRING,
    comment: '상세주소',
  })
  address_detail: string;

  @Column({
    type: DataType.TEXT,
    comment: '내용',
  })
  caption: string;

  @Column({
    type: DataType.GEOMETRY('POINT'),
    comment: '위도,경도',
  })
  geo: { type: string; coordinates: number[] };

  @Column({
    type: DataType.STRING,
    comment: '연락처',
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    comment: '지점명',
  })
  branch_location: string;

  @Column({
    type: DataType.STRING,
    comment: '지역명',
  })
  region: string;

  @Column({
    type: DataType.STRING,
    comment: '아티클 URL',
  })
  reference_link: string;

  @Column({
    type: DataType.DATE,
    comment: '게시일',
  })
  publish_date: Date;

  @Column({
    type: DataType.DATE,
    comment: '운영시간 오픈일',
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    comment: '운영시간 종료일',
  })
  end_date: Date;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    comment: '온라인 이벤트',
  })
  is_online: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    comment: '오프라인 이벤트',
  })
  is_offline: boolean;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    comment: '조회수',
  })
  view_counts: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '카테고리 ID',
  })
  category_id: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '회사 ID',
  })
  company_id: number;

  @BelongsTo(() => Post, {
    foreignKey: 'category_id',
    targetKey: 'id',
  })
  category: Category;

  @BelongsTo(() => Post, {
    foreignKey: 'company_id',
    targetKey: 'id',
  })
  company: Company;

  @Default(DataType.NOW)
  @CreatedAt
  @Column
  createdAt: Date;

  @Default(DataType.NOW)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
