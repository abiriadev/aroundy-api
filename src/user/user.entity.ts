import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  user_id: string;

  @Column()
  username: string;

  @Column('text')
  password: string;

  @Column()
  login_type: string;

  @Column({ nullable: true })
  nickname: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date | null;

  constructor(
    id: string,
    user_id: string,
    username: string,
    password: string,
    login_type: string,
    nickname?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.login_type = login_type;
    this.nickname = nickname || null;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.deleted_at = deleted_at || null;
  }
}
