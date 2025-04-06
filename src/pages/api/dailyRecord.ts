import { NextApiRequest, NextApiResponse } from 'next';
import {
  createDailyRecord,
  getDailyRecords,
  getDailyRecordById,
  getDailyRecordsByChildId,
  updateDailyRecord,
  deleteDailyRecord,
  registerActionTime,
} from '../../controllers/dailyRecordController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.childId) {
        try {
          const date = req.query.date as string | undefined;
          const records = await getDailyRecordsByChildId(Number(req.query.childId), date);
          if (records && records.length > 0) {
            res.status(200).json(records);
          } else {
            res.status(404).json({ error: 'No records found for this child' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch records for this child' });
        }
      } else if (req.query.id) {
        try {
          const record = await getDailyRecordById(Number(req.query.id));
          if (record) {
            res.status(200).json(record);
          } else {
            res.status(404).json({ error: 'Record not found' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch record' });
        }
      } else {
        try {
          const records = await getDailyRecords();
          res.status(200).json(records);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch records' });
        }
      }
      break;

    case 'POST':
      if (req.body) {
        // Registrar tempo de ação
        try {
          const { childId, actionId, isPositive, date } = req.body;
          const newRecord = await registerActionTime(childId, actionId, new Date(date), isPositive);
          res.status(201).json(newRecord);
        } catch (error) {
          res.status(500).json({ error: 'Falha ao registrar tempo de ação', details: error.message });
        }
      } else {
        // Criar um novo registro diário (se necessário para outros casos)
        try {
          const { date, childId, positiveActionId, negativeActionId } = req.body;
          const newRecord = await createDailyRecord(new Date(date), childId, positiveActionId, negativeActionId);
          res.status(201).json(newRecord);
        } catch (error) {
          res.status(500).json({ error: 'Falha ao criar registro', details: error.message });
        }
      }
      break;

    case 'PUT':
      try {
        const { id, date, childId, positiveActionId, negativeActionId, duration } = req.body;
        const updatedRecord = await updateDailyRecord(id, new Date(date), childId, positiveActionId, negativeActionId, duration);
        res.status(200).json(updatedRecord);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update record' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const deletedRecord = await deleteDailyRecord(id);
        res.status(200).json(deletedRecord);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete record' });
      }
      break;

    default:
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}