/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date | null;

  constructor(
    id: string,
    logo_url: string,
    name: string,
    state: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,
  ) {
    this.id = id;
    this.logo_url = logo_url;
    this.name = name;
    this.state = state;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.deleted_at = deleted_at || null;
  }
}
