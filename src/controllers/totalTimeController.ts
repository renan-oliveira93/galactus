import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function totalTime(childId: number) {
  try {
    const child = await prisma.child.findUnique({
      where: { id: childId },
      select: {
        positiveTime: true,
        negativeTime: true,
      },
    });
    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const totalTime = (child.positiveTime || 0) - (child.negativeTime || 0);
    return { totalTime };
  } catch (error) {
    console.error('Erro ao calcular tempo total:', error);
    throw error;
  }
}
