import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignStatus } from './campaign.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get()
  findAll(@Query('status') status?: CampaignStatus) {
    return this.campaignsService.findAll(status);
  }

  @Get('stats')
  getStats() {
    return this.campaignsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campaignsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateCampaignDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.campaignsService.create(dto, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCampaignDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.campaignsService.update(id, dto, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { sub: number } },
  ) {
    return this.campaignsService.remove(id, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  join(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { sub: number } },
  ) {
    return this.campaignsService.join(id, req.user.sub);
  }
}
