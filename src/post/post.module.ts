import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { KakaoMapService } from './kakao-map.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [PostService, KakaoMapService],
  controllers: [PostController],
})
export class PostModule {}
