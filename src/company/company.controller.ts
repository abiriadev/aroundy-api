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
import { ApiOperation } from '@nestjs/swagger';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * 기업 전체 목록을 조회 및 검색합니다.
   */
  @Get()
  @ApiOperation({ summary: '기업 목록 조회' })
  async findAll(): Promise<Array<CompanyDto>> {
    return this.companyService.findAll({});
  }

  /**
   * 신규 기업 정보를 등록합니다.
   *
   * 동일한 기업명이 이미 존재하는 경우, 예외가 발생합니다.
   */
  @Post()
  @ApiOperation({ summary: '기업 가입' })
  async create(@Body() company: CompanyDto.Create) {
    return this.companyService.create(company);
  }

  /**
   * 기업 정보를 수정합니다.
   */
  @Patch(':id')
  @ApiOperation({ summary: '기업정보 수정' })
  async update(@Param('id') id: string, @Body() company: CompanyDto.Update) {
    return this.companyService.update(id, company);
  }

  /**
   * 기업을 탈퇴시킵니다.
   *
   * 단, 기업 정보는 삭제되지 않으며, 해당 기업이 올린 모든 포스트는 공개된 채로 보존됩니다.
   */
  @Delete(':id')
  @ApiOperation({ summary: '기업 탈퇴' })
  async remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
