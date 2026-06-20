import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CampaignStatus, CampaignUrgency } from '../campaign.entity';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(CampaignUrgency)
  urgency: CampaignUrgency;
}

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(CampaignUrgency)
  urgency?: CampaignUrgency;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;
}
