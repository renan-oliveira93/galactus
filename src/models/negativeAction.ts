import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const NegativeAction = prisma.negativeAction;