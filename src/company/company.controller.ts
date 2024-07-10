import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll(): Promise<Array<CompanyDto>> {
    return this.companyService.findAll({});
  }

  @Post()
  async create(@Body() company: CompanyDto.Create) {
    return this.companyService.create(company);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() company: CompanyDto.Update) {
    return this.companyService.update(id, company);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
