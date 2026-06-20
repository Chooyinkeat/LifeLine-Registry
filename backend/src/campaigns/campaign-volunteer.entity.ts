import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../auth/auth.entity';
import { Campaign } from './campaign.entity';

@Entity('campaign_volunteers')
@Unique(['userId', 'campaignId'])
export class CampaignVolunteer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.volunteers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @Column()
  campaignId: number;

  @CreateDateColumn()
  joinedAt: Date;
}
