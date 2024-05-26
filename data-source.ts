/* eslint-disable */
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Category } from './src/category/category.entity';
import { Company } from './src/company/company.entity';
import { User } from './src/user/user.entity';
import { Post } from './src/post/post.entity';
import CreateCategories from './src/seeds/create-categories.seed';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Category, Company, User, Post],
  synchronize: true,
  seeds: [CreateCategories],
  factories: [],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
