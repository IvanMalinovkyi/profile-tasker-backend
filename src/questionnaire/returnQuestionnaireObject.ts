import { Prisma } from 'prisma/generated/client';

export const returnQuestionnaireObject: Prisma.QuestionnaireSelect = {
  name: true,
  profession: true,
  description: true,
};
