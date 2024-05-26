import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    CategoryModule,
    CompanyModule,
    PostModule,
    TagModule,
  ],
})
export class AppModule {}
