import { NextApiRequest, NextApiResponse } from 'next';
import { 
  createPositiveAction, 
  getPositiveActions, 
  getPositiveActionById, 
  updatePositiveAction, 
  deletePositiveAction 
} from '../../controllers/positiveActionController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        try {
          const action = await getPositiveActionById(Number(req.query.id));
          if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).json({ error: 'Ação não encontrada' });
          }
        } catch (error) {
          const err = error as Error;
          res.status(500).json({ error: 'Falha ao buscar ação', details: err.message });
        }
      } else {
        try {
          const actions = await getPositiveActions();
          res.status(200).json(actions);
        } catch (error) {
          const err = error as Error;
          res.status(500).json({ error: 'Falha ao buscar ações', details: err.message });
        }
      }
      break;

    case 'POST':
      try {
        const { name, duration, description } = req.body;
        const newAction = await createPositiveAction(name, duration, description);
        res.status(201).json(newAction);
      } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: 'Falha ao criar ação', details: err.message });
      }
      break;

    case 'PUT':
      try {
        const { id, name, duration, description } = req.body;
        const updatedAction = await updatePositiveAction(id, name, duration, description);
        res.status(200).json(updatedAction);
      } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: 'Falha ao atualizar ação', details: err.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const deletedAction = await deletePositiveAction(id);
        res.status(200).json(deletedAction);
      } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: 'Falha ao deletar ação', details: err.message });
      }
      break;

    default:
      res.status(405).json({ error: `Método não permitido` });
      break;
  }
}
