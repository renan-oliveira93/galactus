import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPositiveAction(name: string, duration: number, description: string | null) {
  const newAction = await prisma.positiveAction.create({
    data: {
      name,
      duration,
      description,
    },
  });
  return newAction;
}

export async function getPositiveActions() {
  const actions = await prisma.positiveAction.findMany();
  return actions;
}

export async function getPositiveActionById(id: number) {
  try {
    const action = await prisma.positiveAction.findUnique({
      where: {
        id,
      },
    });
    return action;
  } catch (error) {
    console.error('Erro ao buscar ação positiva por ID:', error);
    throw error;
  }
}

export async function updatePositiveAction(id: number, name: string, duration: number, description: string | null) {
  const updatedAction = await prisma.positiveAction.update({
    where: {
      id,
    },
    data: {
      name,
      duration,
      description,
    },
  });
  return updatedAction;
}

export async function deletePositiveAction(id: number) {
  const deletedAction = await prisma.positiveAction.delete({
    where: {
      id,
    },
  });
  return deletedAction;
}