import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthQuard } from '../guard/jwt.guard';
import { TypeRole } from '../interfaces/auth.interface';
import { AdminQuard } from '../guard/admin.quard';

export const Auth = (role: TypeRole = 'user') => {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthQuard, AdminQuard)
      : UseGuards(JwtAuthQuard),
  );
};
