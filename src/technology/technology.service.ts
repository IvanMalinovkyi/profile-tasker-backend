import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TechnologyDto } from './dto/technology.dto';

@Injectable()
export class TechnologyService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.technology.findMany();
  }

  async create(dto: TechnologyDto) {
    return this.prisma.technology.create({
      data: dto,
    });
  }
}
