import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnTaskObject } from './return-task.object';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.task.findMany({
      select: returnTaskObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(dto: TaskDto, userId: string) {
    return this.prismaService.task.create({
      data: {
        name: dto.name,
        isCompleted: dto.isCompleted,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async update(taskId: string, dto: TaskDto) {
    const task = await this.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return this.prismaService.task.update({
      where: { id: taskId },
      data: {
        name: dto.name,
        isCompleted: dto.isCompleted,
      },
    });
  }

  async delete(taskId: string) {
    const task = await this.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return this.prismaService.task.delete({
      where: { id: taskId },
    });
  }

  private async getTaskById(id: string) {
    return this.prismaService.task.findUnique({
      where: { id: id },
    });
  }
}
