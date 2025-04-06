import { createChild, getChildren, getChildById, updateChild, deleteChild } from '../../controllers/childController';
import { PrismaClient } from '@prisma/client';

// Mockando o Prisma Client diretamente
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      child: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
  };
});

describe('childController', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient(); // Instanciando o PrismaClient mockado
  });

  // Teste de criação de criança
  it('should create a new child', async () => {
    const newChildData = { name: 'John Doe', age: 10 };
    const mockChild = { id: 1, ...newChildData };

    // Mockando a resposta do método `create`
    prisma.child.create.mockResolvedValue(mockChild);

    const result = await createChild(newChildData.name, newChildData.age);

    expect(prisma.child.create).toHaveBeenCalledWith({
      data: newChildData,
    });
    expect(result).toEqual(mockChild);
  });

  // Teste de obtenção de todas as crianças
  it('should return all children', async () => {
    const mockChildren = [
      { id: 1, name: 'John Doe', age: 10 },
      { id: 2, name: 'Jane Doe', age: 8 },
    ];

    // Mockando a resposta do método `findMany`
    prisma.child.findMany.mockResolvedValue(mockChildren);

    const result = await getChildren();

    expect(prisma.child.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockChildren);
  });

  // Teste de obtenção de criança por ID
  it('should return a child by id', async () => {
    const mockChild = { id: 1, name: 'John Doe', age: 10 };

    // Mockando a resposta do método `findUnique`
    prisma.child.findUnique.mockResolvedValue(mockChild);

    const result = await getChildById(1);

    expect(prisma.child.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockChild);
  });

  // Teste de atualização de criança
  it('should update a child', async () => {
    const updatedData = { name: 'John Smith', age: 11 };
    const mockUpdatedChild = { id: 1, ...updatedData };

    // Mockando a resposta do método `update`
    prisma.child.update.mockResolvedValue(mockUpdatedChild);

    const result = await updateChild(1, updatedData.name, updatedData.age);

    expect(prisma.child.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
    expect(result).toEqual(mockUpdatedChild);
  });

  // Teste de exclusão de criança
  it('should delete a child', async () => {
    const mockDeletedChild = { id: 1, name: 'John Doe', age: 10 };

    // Mockando a resposta do método `delete`
    prisma.child.delete.mockResolvedValue(mockDeletedChild);

    const result = await deleteChild(1);

    expect(prisma.child.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockDeletedChild);
  });
});
