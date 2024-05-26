import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() post: PostEntity,
  ): Promise<PostEntity> {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.remove(id);
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    }),
  )
  async uploadFiles(
    @Param('id') id: string,
    @UploadedFiles() files: { images?: diskStorage.File[] },
  ) {
    const images = files.images.map((file) => `/uploads/${file.filename}`);
    return this.postService.addImages(id, images);
  }
}
