import { Manager } from '../models/manager';  // Supondo que o modelo esteja importado corretamente
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createManager(name: string, email: string, password: string) {
  const newManager = await Manager.create({
    data: {
      name,
      email,
      password,
    },
  });
  return newManager;
}

export async function getManagers() {
  const managers = await Manager.findMany();
  return managers;
}

export async function getManagerById(id: number) {
  const manager = await Manager.findUnique({
    where: {
      id,
    },
  });
  return manager;
}

export async function updateManager(id: number, name: string, email: string, password: string) {
  const updatedManager = await Manager.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
    },
  });
  return updatedManager;
}

export async function deleteManager(id: number) {
  const deletedManager = await Manager.delete({
    where: {
      id,
    },
  });
  return deletedManager;
}
