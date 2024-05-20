import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
})
export class AppModule {}
