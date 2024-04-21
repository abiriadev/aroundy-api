import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDTO {
  @ApiProperty({
    description: '토큰',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI12345VCJ9.eyJ1c2VybmFtZSI6InRlc3QwMUB0ZXN0LmNvbSIsImlkIjo2MTAsIl9pZCI6IjY2MDIyODE0NjY3ZWI4NWE0ZWMxMWU0NyIsImlhdCI6MTcxMTQxNzM2NCwiZXhwIjoxNzE0MDA5MzY0LCJpc3MiOiJ3ZWJsYWJfX2lzc3VlciIsInN1YiI6InVzZXJJbmZvIn0.WIStg6Buj6mH0gSdnEH-9bHoQJbN24pOjjY-ErLGzsc',
  })
  token: string;

  @ApiProperty({
    description: '리프레시 토큰',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5c12345pXVCJ9.eyJ1c2VybmFtZSI6InRlc3QwMUB0ZXN0LmNvbSIsImlkIjo2MTAsIl9pZCI6IjY2MDIyODE0NjY3ZWI4NWE0ZWMxMWU0NyIsImlhdCI6MTcxMTQxNzM2NCwiZXhwIjoxNzQyOTUzMzY0LCJpc3MiOiJ3ZWJsYWJfX2lzc3VlciIsInN1YiI6InVzZXJJbmZvIn0.b0silmUyjVUDBm09LMSdoZJ_As4seHuY4HUuSvJzHG8',
  })
  refreshToken: string;
}
