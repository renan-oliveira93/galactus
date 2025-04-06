import { NextApiRequest, NextApiResponse } from 'next';
import { 
  createNegativeAction, 
  getNegativeActions, 
  getNegativeActionById, 
  updateNegativeAction, 
  deleteNegativeAction 
} from '../../controllers/negativeActionController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Para buscar todas as ações negativas
      if (req.query.id) {
        try {
          const action = await getNegativeActionById(Number(req.query.id));
          if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).json({ error: 'Action not found' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch action' });
        }
      } else {
        try {
          const actions = await getNegativeActions();
          res.status(200).json(actions);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch actions' });
        }
      }
      break;

    case 'POST':
      // Para criar uma nova ação negativa
      try {
        const { name, duration, description } = req.body;
        const newAction = await createNegativeAction(name, duration, description);
        res.status(201).json(newAction);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create action' });
      }
      break;

    case 'PUT':
      // Para atualizar uma ação negativa existente
      try {
        const { id, name, duration, description } = req.body;
        const updatedAction = await updateNegativeAction(id, name, duration, description);
        res.status(200).json(updatedAction);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update action' });
      }
      break;

    case 'DELETE':
      // Para deletar uma ação negativa
      try {
        const { id } = req.body;
        const deletedAction = await deleteNegativeAction(id);
        res.status(200).json(deletedAction);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete action' });
      }
      break;

    default:
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
