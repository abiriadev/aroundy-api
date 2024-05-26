import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date | null;
}
