import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDTO {
  @ApiProperty({ example: 25 })
  seq: number;

  @ApiProperty({ example: 140 })
  user: number;

  @ApiProperty({ example: 142 })
  tutor: number;

  @ApiProperty({ example: ['2024-02-01T16:30:00.000Z'], type: [String] })
  times: string[];

  @ApiProperty({ example: '2024-02-01T16:30:00.000Z' })
  startTime: string;

  @ApiProperty({ example: false })
  removed: boolean;

  @ApiProperty({ example: null, nullable: true })
  estimate: number | null;

  @ApiProperty({ example: null, nullable: true })
  nextHomework: number | null;

  @ApiProperty({ example: null, nullable: true })
  nextScheduled: number | null;

  @ApiProperty({ example: null, nullable: true })
  previousClassId: number | null;
}

export class CreatePostDto {
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: [String] })
  feed_urls: string[];
  @ApiProperty({ type: String })
  address: string;
  @ApiProperty({ type: String })
  address_detail: string;
  @ApiProperty({ type: String })
  region: string;
  @ApiProperty({ type: String })
  caption: string;
  @ApiProperty({ type: String })
  geo: string;
  @ApiProperty({ type: String })
  phone: string;
  @ApiProperty({ type: String })
  reference_link: string;
  @ApiProperty({ type: Date })
  publish_date: Date;
  @ApiProperty({ type: Date })
  start_date: Date;
  @ApiProperty({ type: Date })
  end_date: Date;
  @ApiProperty({ type: Boolean })
  is_offline: boolean;
  @ApiProperty({ type: Boolean })
  is_online: boolean;
  @ApiProperty({ type: [Number] })
  tag_ids: number[];
  @ApiProperty({ type: Number })
  company_id: number;
  @ApiProperty({ type: Number })
  category_id: number;
}
