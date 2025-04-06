const mockCreate = jest.fn();
const mockFindMany = jest.fn();
const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

const prisma = {
  child: {
    create: mockCreate,
    findMany: mockFindMany,
    findUnique: mockFindUnique,
    update: mockUpdate,
    delete: mockDelete,
  },
};

export { prisma };
