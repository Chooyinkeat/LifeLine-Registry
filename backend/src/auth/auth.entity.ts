import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // table name
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
