import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnQuestionnaireObject } from './returnQuestionnaireObject';
import { QuestionnaireDto } from './dto/questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(private prismaService: PrismaService) {}

  async get(userId: string) {
    return await this.prismaService.questionnaire.findUnique({
      select: returnQuestionnaireObject,
      where: { userId },
    });
  }

  async create(dto: QuestionnaireDto, userId: string) {
    const existingQuestionnaire =
      await this.prismaService.questionnaire.findUnique({
        where: { userId },
      });

    if (existingQuestionnaire) {
      return this.prismaService.questionnaire.update({
        where: { userId },
        data: dto,
      });
    } else {
      return this.prismaService.questionnaire.create({
        data: {
          ...dto,
          user: {
            connect: { id: userId },
          },
        },
      });
    }
  }

  async update(userId: string, dto: QuestionnaireDto) {
    return this.prismaService.questionnaire.update({
      where: { userId },
      data: dto,
    });
  }

  async delete(userId: string) {
    return this.prismaService.questionnaire.delete({
      where: { userId },
    });
  }
}
