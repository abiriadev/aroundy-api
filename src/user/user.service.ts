import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, { ...user, updated_at: new Date() });
    return this.findOne(id);
  }

  async remove(id: string): Promise<User> {
    await this.userRepository.update(id, { deleted_at: new Date() });
    return this.findOne(id);
  }
}
