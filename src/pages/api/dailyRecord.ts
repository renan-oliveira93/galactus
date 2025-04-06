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
          const err = error as Error;
          res.status(500).json({ error: 'Failed to fetch records for this child', details: err.message });
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
          const err = error as Error;
          res.status(500).json({ error: 'Failed to fetch record', details: err.message });
        }
      } else {
        try {
          const records = await getDailyRecords();
          res.status(200).json(records);
        } catch (error) {
          const err = error as Error;
          res.status(500).json({ error: 'Failed to fetch records', details: err.message });
        }
      }
      break;

    case 'POST':
      if (req.body) {
        try {
          const { childId, actionId, isPositive, date } = req.body;
          const newRecord = await registerActionTime(childId, actionId, new Date(date), isPositive);
          res.status(201).json(newRecord);
        } catch (error) {
          const err = error as Error;
          res.status(500).json({ error: 'Falha ao registrar tempo de ação', details: err.message });
        }
      } else {
        try {
          const { date, childId, positiveActionId, negativeActionId } = req.body;
          const newRecord = await createDailyRecord(new Date(date), childId, positiveActionId, negativeActionId);
          res.status(201).json(newRecord);
        } catch (error) {
          const err = error as Error;
          res.status(500).json({ error: 'Falha ao criar registro', details: err.message });
        }
      }
      break;

    case 'PUT':
      try {
        const { id, date, childId, positiveActionId, negativeActionId, duration } = req.body;
        const updatedRecord = await updateDailyRecord(id, new Date(date), childId, positiveActionId, negativeActionId, duration);
        res.status(200).json(updatedRecord);
      } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: 'Failed to update record', details: err.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const deletedRecord = await deleteDailyRecord(id);
        res.status(200).json(deletedRecord);
      } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: 'Failed to delete record', details: err.message });
      }
      break;

    default:
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
