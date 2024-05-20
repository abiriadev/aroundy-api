import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }

  create(company: Company): Promise<Company> {
    return this.companyRepository.save(company);
  }

  async update(id: string, company: Company): Promise<Company> {
    await this.companyRepository.update(id, {
      ...company,
      updated_at: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<Company> {
    await this.companyRepository.update(id, { deleted_at: new Date() });
    return this.findOne(id);
  }
}
