export class CreateCategoryDto {
  name: string;
}

export class CategoryDto extends CreateCategoryDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
