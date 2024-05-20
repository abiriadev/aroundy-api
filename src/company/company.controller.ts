import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Body() company: Company): Promise<Company> {
    return this.companyService.create(company);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() company: Company): Promise<Company> {
    return this.companyService.update(id, company);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Company> {
    return this.companyService.remove(id);
  }
}
