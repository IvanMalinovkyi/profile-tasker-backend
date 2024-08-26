import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from 'prisma/generated/client';

Injectable();
export class AdminQuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    if (user.role !== UserRole.ADMIN)
      throw new ForbiddenException("You don't have access for this operation");

    return true;
  }
}
