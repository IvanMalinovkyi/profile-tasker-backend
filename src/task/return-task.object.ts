import { Prisma } from 'prisma/schema/generated/client';

export const returnTaskObject: Prisma.TaskSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  isCompleted: true,
};
