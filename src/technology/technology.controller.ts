import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyDto } from './dto/technology.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Technology')
@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @ApiOperation({ summary: 'Get all technologies' })
  @ApiResponse({ status: 200, description: 'Return all technologies' })
  @Get()
  async getAll() {
    return this.technologyService.getAll();
  }

  @ApiOperation({ summary: 'Create a new technology' })
  @ApiResponse({ status: 201, description: 'Technology successfully created' })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: TechnologyDto) {
    return this.technologyService.create(dto);
  }
}
