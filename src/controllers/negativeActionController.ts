import { NegativeAction } from '../models/negativeAction';

export async function createNegativeAction(name: string, duration: number, description: string) {
  const newAction = await NegativeAction.create({
    data: {
      name,
      duration,
      description,
    },
  });
  return newAction;
}

export async function getNegativeActions() {
  const actions = await NegativeAction.findMany();
  return actions;
}

export async function getNegativeActionById(id: number) {
  const action = await NegativeAction.findUnique({
    where: {
      id,
    },
  });
  return action;
}

export async function updateNegativeAction(id: number, name: string, duration: number, description: string) {
  const updatedAction = await NegativeAction.update({
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

export async function deleteNegativeAction(id: number) {
  const deletedAction = await NegativeAction.delete({
    where: {
      id,
    },
  });
  return deletedAction;
}
