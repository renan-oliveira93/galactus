import { NextApiRequest, NextApiResponse } from 'next';
import { 
  createManager, 
  getManagers, 
  getManagerById, 
  updateManager, 
  deleteManager 
} from '../../controllers/managerController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Para buscar todos os managers
      if (req.query.id) {
        try {
          const manager = await getManagerById(Number(req.query.id));
          if (manager) {
            res.status(200).json(manager);
          } else {
            res.status(404).json({ error: 'Manager not found' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch manager' });
        }
      } else {
        try {
          const managers = await getManagers();
          res.status(200).json(managers);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch managers' });
        }
      }
      break;

    case 'POST':
      // Para criar um novo manager
      try {
        const { name, email, password } = req.body;
        const newManager = await createManager(name, email, password);
        res.status(201).json(newManager);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create manager' });
      }
      break;

    case 'PUT':
      // Para atualizar um manager existente
      try {
        const { id, name, email, password } = req.body;
        const updatedManager = await updateManager(id, name, email, password);
        res.status(200).json(updatedManager);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update manager' });
      }
      break;

    case 'DELETE':
      // Para deletar um manager
      try {
        const { id } = req.body;
        const deletedManager = await deleteManager(id);
        res.status(200).json(deletedManager);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete manager' });
      }
      break;

    default:
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
