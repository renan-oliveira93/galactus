'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/index.module.scss';
import { client } from '@/utils/client';

export default function MainCard() {
  const [activeTab, setActiveTab] = useState(1);
  const [availableTime, setAvailableTime] = useState(0);
  const [registeredToday, setRegisteredToday] = useState(0);

  const getActionDuration = async (actionId: number, isPositive: boolean) => {
    try {
      const endpoint = isPositive ? 'positiveAction' : 'negativeAction';
      const action = await client(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/${endpoint}?id=${actionId}`);
      return action.duration || 0;
    } catch (err) {
      console.error('Erro ao buscar duração da ação', err);
      return 0;
    }
  };

  const loadData = async (childId: number) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    try {
      // ======================
      // 📌 Ações de ontem = tempo disponível hoje
      // ======================
      const recordsYesterdayRaw = await client(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/dailyRecord?childId=${childId}&date=${yesterdayStr}`
      );
      const recordsYesterday = Array.isArray(recordsYesterdayRaw) ? recordsYesterdayRaw : [];

      let totalFromYesterday = 0;
      for (const record of recordsYesterday) {
        const isPositive = record.positiveActionId != null;
        const actionId = isPositive
          ? record.positiveActionId
          : record.negativeActionId;

        const duration = await getActionDuration(actionId, isPositive);
        totalFromYesterday += isPositive ? duration : -duration;
      }
      setAvailableTime(totalFromYesterday);

      // ======================
      // 📌 Ações de hoje = tempo já utilizado
      // ======================
      const recordsTodayRaw = await client(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/dailyRecord?childId=${childId}&date=${todayStr}`
      );
      const recordsToday = Array.isArray(recordsTodayRaw) ? recordsTodayRaw : [];

      let totalToday = 0;
      for (const record of recordsToday) {
        const isPositive = record.positiveActionId != null;
        const actionId = isPositive
          ? record.positiveActionId
          : record.negativeActionId;

        const duration = await getActionDuration(actionId, isPositive);
        totalToday += isPositive ? duration : -duration;
      }
      setRegisteredToday(totalToday);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setAvailableTime(0);
      setRegisteredToday(0);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  return (
    <section className={styles.mainCard}>
      <nav className={styles.mainCard__content}>
        <button
          className={`${styles.mainCard__content__btn} ${activeTab === 1 ? styles.active : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Matheus
        </button>
        <button
          className={`${styles.mainCard__content__btn} ${activeTab === 2 ? styles.active : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Eduardo
        </button>
      </nav>
      <p className={styles.mainCard__time}>
        ⏳ Tempo disponível para hoje: <strong><br/>{availableTime} min</strong>
      </p>
      <p className={styles.mainCard__time}>
        ✅ Tempo já registrado para amanhã: <strong><br/>{registeredToday} min</strong>
      </p>
    </section>
  );
}
