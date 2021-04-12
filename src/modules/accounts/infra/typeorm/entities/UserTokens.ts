import { v4 as uuidV4 } from 'uuid';

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ITokenType } from '@shared/dtos/ITokenTypeDTO';

import { User } from './User';

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column({ type: 'enum', enum: ITokenType })
  type: ITokenType;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserTokens };
