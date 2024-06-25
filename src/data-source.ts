/* eslint-disable */
import { config } from 'dotenv';
config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Category } from './category/category.entity';
import { Company } from './company/company.entity';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Tag } from './tag/tag.entity';
import CreateCategories from './seeds/create-categories.seed';
import CreateTags from './seeds/create-tags.seed';
import tagFactory from './factories/tag.factory';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Category, Company, User, Post, Tag],
  synchronize: true,
  seeds: [CreateCategories, CreateTags],
  factories: [tagFactory],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
