export class CreateTagDto {
  name: string;
}

export class TagDto extends CreateTagDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
