// jest.config.ts
export default {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'], // Arquivo de setup global
    testEnvironment: 'node',
  };
  