import { NextApiRequest, NextApiResponse } from 'next';
import { totalTime } from '../../controllers/totalTimeController'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { childId } = req.query;

    if (!childId) {
      return res.status(400).json({ error: 'childId é obrigatório' }); 
    }

    try {
      const time = await totalTime(Number(childId));
      res.status(200).json(time);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao calcular tempo total', details: error.message }); 
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}