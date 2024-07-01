import { PartialType } from '@nestjs/swagger';

export class CreateCompanyDto {
  name: string;
  logo: string;
}

export class CompanyDto extends CreateCompanyDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaginatedCompaniesDto {
  items: Array<CompanyDto>;
  cursor: string | null;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
