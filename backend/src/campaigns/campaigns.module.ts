import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './campaign.entity';
import { CampaignVolunteer } from './campaign-volunteer.entity';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { User } from '../auth/auth.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign, CampaignVolunteer, User]),
    AuthModule,
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
