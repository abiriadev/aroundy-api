import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { env } from 'node:process';
import { configValidator } from './config/config.validator';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    CategoryModule,
    CompanyModule,
    PostModule,
    TagModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: env.NODE_ENV === 'production',
      envFilePath: env.NODE_ENV === 'production' ? undefined : '.local.env',
      expandVariables: true,
      validate: configValidator,
    }),
  ],
})
export class AppModule {}
