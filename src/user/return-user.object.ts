import { Prisma } from 'prisma/generated/client';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  createdAt: true,
  name: true,
  email: true,
  password: true,
  questionnaire: true,
  role: true,
};
