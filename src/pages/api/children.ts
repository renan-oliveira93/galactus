import { NextApiRequest, NextApiResponse } from 'next';
import { createChild, getChildren, getChildById, updateChild, deleteChild } from '../../controllers/childController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Para o método GET, retorna todos os filhos ou um filho específico se o ID for fornecido
  if (req.method === 'GET') {
    const { id } = req.query;
    
    // Se houver um ID na query, busca um filho específico
    if (id) {
      try {
        const child = await getChildById(Number(id));
        if (!child) {
          return res.status(404).json({ error: 'Child not found' });
        }
        res.status(200).json(child);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch child' });
      }
    } else {
      // Se não houver ID, retorna todos os filhos
      try {
        const children = await getChildren();
        res.status(200).json(children);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch children' });
      }
    }
  }

  // Para o método POST, cria um novo filho
  else if (req.method === 'POST') {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }

    try {
      const newChild = await createChild(name, age);
      res.status(201).json(newChild);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create child' });
    }
  }

  // Para o método PUT, atualiza os dados de um filho
  else if (req.method === 'PUT') {
    const { id, name, age } = req.body;
    if (!id || (!name && !age)) {
      return res.status(400).json({ error: 'ID, name or age are required for update' });
    }

    try {
      const updatedChild = await updateChild(id, name, age);
      if (!updatedChild) {
        return res.status(404).json({ error: 'Child not found' });
      }
      res.status(200).json(updatedChild);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update child' });
    }
  }

  // Para o método DELETE, deleta um filho baseado no ID
  else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID is required to delete' });
    }

    try {
      const deletedChild = await deleteChild(Number(id));
      if (!deletedChild) {
        return res.status(404).json({ error: 'Child not found' });
      }
      res.status(200).json(deletedChild);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete child' });
    }
  }

  // Caso o método HTTP não seja suportado
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
