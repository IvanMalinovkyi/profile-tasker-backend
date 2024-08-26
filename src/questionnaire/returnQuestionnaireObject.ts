import { Prisma } from 'prisma/schema/generated/client';

export const returnQuestionnaireObject: Prisma.QuestionnaireSelect = {
  name: true,
  profession: true,
  description: true,
};
