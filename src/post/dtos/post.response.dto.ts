import { ApiProperty } from '@nestjs/swagger';
type CategoryType = '팝업스토어' | '뷰티' | '식품' | '축제' | '스타트업';
const CATEGORY_TYPE_LIST: CategoryType[] = [
  '뷰티',
  '스타트업',
  '식품',
  '축제',
  '팝업스토어',
];
export class PostResponseDTO {
    
  @ApiProperty({
    description: '포스트 고유 ID',
    example: 3,
    required: true,
    type: Number,
  })
  post_id: number;
  company_name: string;
  company_logo: string;
  company_link: string;
  title: string;
  thumbnail: string[];
  //   "검수 완료", # 현재는 불필요한 리소스, 고객사 신원 명확하면
  comfirm_status: string;
  @ApiProperty({
    description: '카테고리명',
    example: '팝업스토어',
    enum: CATEGORY_TYPE_LIST,
  })
  category: CategoryType;
  tag: string;
  @ApiProperty({
    description: '이벤트 진행기간 관련 (오픈 D-n)',
    example: '팝업스토어',
    enum: CATEGORY_TYPE_LIST,
  })
  start_day_count: number; //
  @ApiProperty({
    description: '이벤트 진행기간 관련 (마감 D-n)',
    example: '팝업스토어',
    enum: CATEGORY_TYPE_LIST,
  })
  end_day_count: number;

  @ApiProperty({
    description: '카테고리명',
    example: '팝업스토어',
    enum: CATEGORY_TYPE_LIST,
  })
  like_counts: number;
  @ApiProperty({
    description: '카테고리명',
    example: '팝업스토어',
    enum: CATEGORY_TYPE_LIST,
  })
  view_counts: number;
  @ApiProperty({
    description: '카테고리명',
    example: '팝업스토어',
    enum: CATEGORY_TYPE_LIST,
  })
  post_info: string;
}
