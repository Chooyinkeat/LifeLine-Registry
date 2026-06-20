import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';
import { CampaignVolunteer } from './campaign-volunteer.entity';

export enum CampaignStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum CampaignUrgency {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: CampaignStatus, default: CampaignStatus.ACTIVE })
  status: CampaignStatus;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: CampaignUrgency, default: CampaignUrgency.MEDIUM })
  urgency: CampaignUrgency;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: number;

  @OneToMany(() => CampaignVolunteer, (cv) => cv.campaign)
  volunteers: CampaignVolunteer[];

  @CreateDateColumn()
  createdAt: Date;
}
