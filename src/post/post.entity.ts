import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Company } from '../company/company.entity';
import { User } from '../user/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { array: true, nullable: true })
  feed_urls: string[];

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  address_detail: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ nullable: true })
  geo: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  branch_location: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  reference_link: string;

  @Column({ nullable: true })
  publish_date: Date;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ default: false })
  is_online: boolean;

  @Column({ default: false })
  is_offline: boolean;

  @Column({ default: 0 })
  view_count: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date | null;
}
