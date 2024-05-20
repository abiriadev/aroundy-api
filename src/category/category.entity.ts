import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date | null;

  constructor(
    id: string,
    name: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.deleted_at = deleted_at || null;
  }
}
