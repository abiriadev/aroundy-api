import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'nestjs-prisma';
import { KakaoMapService } from './kakao-map.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [ConfigModule, PrismaModule, HttpModule],
  providers: [PostService, KakaoMapService],
  controllers: [PostController],
})
export class PostModule {}
