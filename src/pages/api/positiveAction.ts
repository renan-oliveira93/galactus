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
      // Para buscar todas as ações positivas
      if (req.query.id) {
        try {
          const action = await getPositiveActionById(Number(req.query.id));
          if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).json({ error: 'Ação não encontrada' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Falha ao buscar ação', details: error.message }); // Adicionado detalhes do erro
        }
      } else {
        try {
          const actions = await getPositiveActions();
          res.status(200).json(actions);
        } catch (error) {
          res.status(500).json({ error: 'Falha ao buscar ações', details: error.message }); // Adicionado detalhes do erro
        }
      }
      break;

    case 'POST':
      // Para criar uma nova ação positiva
      try {
        const { name, duration, description } = req.body;
        const newAction = await createPositiveAction(name, duration, description);
        res.status(201).json(newAction);
      } catch (error) {
        res.status(500).json({ error: 'Falha ao criar ação', details: error.message }); // Adicionado detalhes do erro
      }
      break;

    case 'PUT':
      // Para atualizar uma ação positiva existente
      try {
        const { id, name, duration, description } = req.body;
        const updatedAction = await updatePositiveAction(id, name, duration, description);
        res.status(200).json(updatedAction);
      } catch (error) {
        res.status(500).json({ error: 'Falha ao atualizar ação', details: error.message }); // Adicionado detalhes do erro
      }
      break;

    case 'DELETE':
      // Para deletar uma ação positiva
      try {
        const { id } = req.body;
        const deletedAction = await deletePositiveAction(id);
        res.status(200).json(deletedAction);
      } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar ação', details: error.message }); // Adicionado detalhes do erro
      }
      break;

    default:
      res.status(405).json({ error: `Método não permitido` });
      break;
  }
}