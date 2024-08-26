import { Prisma } from 'prisma/generated/client';

export const returnTaskObject: Prisma.TaskSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  isCompleted: true,
};
