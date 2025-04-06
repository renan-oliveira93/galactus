import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createChild(name: string, age: number) {
  const newChild = await prisma.child.create({
    data: {
      name,
      age,
    },
  });
  return newChild;
}

export async function getChildren() {
  const children = await prisma.child.findMany();
  return children;
}

export async function getChildById(id: number) {
  const child = await prisma.child.findUnique({
    where: { id },
  });
  return child;
}

export async function updateChild(id: number, name?: string, age?: number) {
  const updatedChild = await prisma.child.update({
    where: { id },
    data: {
      name,
      age,
    },
  });
  return updatedChild;
}

export async function deleteChild(id: number) {
  const deletedChild = await prisma.child.delete({
    where: { id },
  });
  return deletedChild;
}
