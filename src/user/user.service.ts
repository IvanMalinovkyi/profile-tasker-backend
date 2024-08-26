import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { returnUserObject } from './return-user.object';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
        questionnaire: true,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        tasks: true,
        questionnaire: true,
      },
    });
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prismaService.user.create({
      data: user,
    });
  }

  async update(userId: string, dto: UserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: dto,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async delete(userId: string) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  /* Admin requests */

  async getAll(searchTeam?: string) {
    if (searchTeam) this.search(searchTeam);

    return this.prismaService.user.findMany({
      select: returnUserObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async search(searchTerm: string) {
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}
