import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Campaign,
  CampaignStatus,
  CampaignUrgency,
} from './campaign.entity';
import { CampaignVolunteer } from './campaign-volunteer.entity';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { User, UserRole } from '../auth/auth.entity';

export interface CampaignResponse {
  id: number;
  title: string;
  description: string;
  status: CampaignStatus;
  location: string;
  urgency: CampaignUrgency;
  volunteers: number;
  createdBy: { id: number; name: string; role: UserRole };
  createdAt: Date;
}

@Injectable()
export class CampaignsService implements OnModuleInit {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,
    @InjectRepository(CampaignVolunteer)
    private volunteerRepo: Repository<CampaignVolunteer>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.campaignRepo.count();
    if (count === 0) {
      await this.seedCampaigns();
    }
  }

  async findAll(status?: CampaignStatus): Promise<CampaignResponse[]> {
    const where = status ? { status } : {};
    const campaigns = await this.campaignRepo.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['volunteers'],
    });
    return Promise.all(campaigns.map((c) => this.toResponse(c)));
  }

  async findOne(id: number): Promise<CampaignResponse> {
    const campaign = await this.campaignRepo.findOne({
      where: { id },
      relations: ['volunteers'],
    });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return this.toResponse(campaign);
  }

  async create(dto: CreateCampaignDto, userId: number): Promise<CampaignResponse> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== UserRole.ORGANIZATION) {
      throw new ForbiddenException('Only organizations can create campaigns');
    }

    const campaign = this.campaignRepo.create({
      ...dto,
      createdById: userId,
      status: CampaignStatus.ACTIVE,
    });
    const saved = await this.campaignRepo.save(campaign);
    return this.findOne(saved.id);
  }

  async update(
    id: number,
    dto: UpdateCampaignDto,
    userId: number,
  ): Promise<CampaignResponse> {
    const campaign = await this.campaignRepo.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    if (campaign.createdById !== userId) {
      throw new ForbiddenException('You can only edit your own campaigns');
    }

    Object.assign(campaign, dto);
    await this.campaignRepo.save(campaign);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const campaign = await this.campaignRepo.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    if (campaign.createdById !== userId) {
      throw new ForbiddenException('You can only delete your own campaigns');
    }
    await this.campaignRepo.remove(campaign);
  }

  async join(campaignId: number, userId: number): Promise<CampaignResponse> {
    const campaign = await this.campaignRepo.findOne({ where: { id: campaignId } });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    if (campaign.status !== CampaignStatus.ACTIVE) {
      throw new ConflictException('Campaign is not accepting volunteers');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== UserRole.VOLUNTEER) {
      throw new ForbiddenException('Only volunteers can join campaigns');
    }

    const existing = await this.volunteerRepo.findOne({
      where: { userId, campaignId },
    });
    if (existing) {
      throw new ConflictException('You have already joined this campaign');
    }

    const entry = this.volunteerRepo.create({ userId, campaignId });
    await this.volunteerRepo.save(entry);
    return this.findOne(campaignId);
  }

  async getStats() {
    const [campaignCount, volunteerCount, activeCampaigns] = await Promise.all([
      this.campaignRepo.count(),
      this.volunteerRepo.count(),
      this.campaignRepo.count({ where: { status: CampaignStatus.ACTIVE } }),
    ]);
    return {
      activeVolunteers: volunteerCount,
      completedCampaigns: campaignCount,
      activeCampaigns,
      communitiesServed: Math.max(1, Math.ceil(campaignCount / 3)),
    };
  }

  private async toResponse(campaign: Campaign): Promise<CampaignResponse> {
    const volunteerCount = campaign.volunteers
      ? campaign.volunteers.length
      : await this.volunteerRepo.count({ where: { campaignId: campaign.id } });

    return {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      location: campaign.location,
      urgency: campaign.urgency,
      volunteers: volunteerCount,
      createdBy: {
        id: campaign.createdBy.id,
        name: campaign.createdBy.name,
        role: campaign.createdBy.role,
      },
      createdAt: campaign.createdAt,
    };
  }

  private async seedCampaigns() {
    let org = await this.userRepo.findOne({
      where: { email: 'org@volunteerhub.my' },
    });
    if (!org) {
      org = this.userRepo.create({
        name: 'Community Relief Org',
        email: 'org@volunteerhub.my',
        password: '$2b$10$placeholder',
        role: UserRole.ORGANIZATION,
      });
      org = await this.userRepo.save(org);
    }

    const seeds = [
      {
        title: 'Emergency Relief Drive',
        description:
          'Collecting essential supplies for families affected by recent flooding',
        location: 'Downtown Area',
        urgency: CampaignUrgency.HIGH,
      },
      {
        title: 'Community Cleanup Day',
        description: 'Join us in cleaning up local parks and public spaces',
        location: 'Central Park',
        urgency: CampaignUrgency.MEDIUM,
      },
      {
        title: 'Food Bank Support',
        description: 'Volunteers needed to organize and distribute food items',
        location: 'Community Center',
        urgency: CampaignUrgency.MEDIUM,
      },
    ];

    for (const seed of seeds) {
      const campaign = this.campaignRepo.create({
        ...seed,
        createdById: org.id,
        status: CampaignStatus.ACTIVE,
      });
      await this.campaignRepo.save(campaign);
    }
  }
}
