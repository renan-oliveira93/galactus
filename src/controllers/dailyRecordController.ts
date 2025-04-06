import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createDailyRecord(
  date: Date,
  childId: number,
  positiveActionId?: number | null,
  negativeActionId?: number | null
) {
  const newDailyRecord = await prisma.dailyRecord.create({
    data: {
      date,
      childId,
      positiveActionId,
      negativeActionId,
    },
  });
  return newDailyRecord;
}

export async function getDailyRecords() {
  const dailyRecords = await prisma.dailyRecord.findMany();
  return dailyRecords;
}

export async function getDailyRecordsByChildId(childId: number, date?: string) {
  const whereClause: any = { childId };

  if (date) {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0); // Define a hora para o início do dia (UTC)

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999); // Define a hora para o final do dia (UTC)

    whereClause.date = {
      gte: startDate.toISOString(),
      lte: endDate.toISOString(),
    };
  }

  const dailyRecords = await prisma.dailyRecord.findMany({
    where: whereClause,
  });
  return dailyRecords;
}

export async function getDailyRecordById(id: number) {
  const dailyRecord = await prisma.dailyRecord.findUnique({
    where: {
      id,
    },
  });
  return dailyRecord;
}

export async function updateDailyRecord(
  id: number,
  date: Date,
  childId: number,
  positiveActionId: number | null,
  negativeActionId: number | null,
  duration: number
) {
  const updatedDailyRecord = await prisma.dailyRecord.update({
    where: {
      id,
    },
    data: {
      date,
      childId,
      positiveActionId,
      negativeActionId,
      duration,
    },
  });
  return updatedDailyRecord;
}

export async function deleteDailyRecord(id: number) {
  const deletedDailyRecord = await prisma.dailyRecord.delete({
    where: {
      id,
    },
  });
  return deletedDailyRecord;
}

// Função para registrar tempo de ação para uma criança
export async function registerActionTime(
  childId: number,
  actionId: number,
  date: Date,
  isPositive: boolean
) {
  try {
    let duration: number;
    let actionType: 'positiveActionId' | 'negativeActionId';

    if (isPositive) {
      const positiveAction = await prisma.positiveAction.findUnique({
        where: { id: actionId },
      });
      if (!positiveAction) {
        throw new Error('Ação positiva não encontrada.');
      }
      duration = positiveAction.duration;
      actionType = 'positiveActionId';
    } else {
      const negativeAction = await prisma.negativeAction.findUnique({
        where: { id: actionId },
      });
      if (!negativeAction) {
        throw new Error('Ação negativa não encontrada.');
      }
      duration = negativeAction.duration;
      actionType = 'negativeActionId';
    }

    // Atualizar o tempo da criança
    try {
      await prisma.child.update({
        where: { id: childId },
        data: {
          [isPositive ? 'positiveTime' : 'negativeTime']: {
            increment: duration,
          },
        },
      });
    } catch (updateError) {
      console.error('Erro ao atualizar tempo da criança:', updateError);
      throw updateError; // Re-lançar o erro para que a rota possa tratar
    }

    // Criar registro em DailyRecord
    const dailyRecord = await prisma.dailyRecord.create({
      data: {
        date,
        childId,
        [actionType]: actionId,
      },
    });

    return dailyRecord; // Retornar apenas o registro criado
  } catch (error) {
    console.error('Erro ao registrar tempo de ação:', error);
    throw error;
  }
  
}
