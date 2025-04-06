'use client';

import { useEffect, useState } from "react";
import styles from "../../styles/index.module.scss";
import { Action } from "@/types/Action";
import Link from "next/link";

interface ChildOption {
  id: number;
  name: string;
}

const children: ChildOption[] = [
  { id: 1, name: 'Matheus' },
  { id: 2, name: 'Eduardo' }
];

export default function ActionRegister() {
  const [selectedChild, setSelectedChild] = useState<ChildOption>(children[0]);
  const [actionType, setActionType] = useState<'positive' | 'negative'>('positive');
  const [actions, setActions] = useState<Action[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActions() {
      const endpoint = actionType === 'positive' ? '/api/positiveAction' : '/api/negativeAction';
      const res = await fetch(endpoint);
      const data = await res.json();
      setActions(data);
      setSelectedActionId(data[0]?.id ?? null);
    }

    fetchActions();
  }, [actionType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActionId) return;

    const payload = {
      date: new Date().toISOString(),
      childId: selectedChild.id,
      actionId: selectedActionId,
      isPositive: actionType === 'positive'
    };

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/dailyRecord`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Erro ao registrar ação');
      }

      setFeedback('Ação registrada com sucesso!');
    } catch (err: any) {
      setFeedback(err.message || 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.actionRegister}>
      <h2 className={styles.actionRegister__title}>Registrar Ação</h2>

      <nav className={styles.actionRegister__content}>
        {children.map((child) => (
          <button
            key={child.id}
            className={`${styles.actionRegister__content__btn} ${selectedChild.id === child.id ? styles.active : ''}`}
            onClick={() => setSelectedChild(child)}
            type="button"
          >
            {child.name}
          </button>
        ))}
      </nav>

      <div className={styles.actionRegister__tabs}>
        <button
          className={actionType === 'positive' ? styles.active : ''}
          onClick={() => setActionType('positive')}
          type="button"
        >
          Positiva
        </button>
        <button
          className={actionType === 'negative' ? styles.active : ''}
          onClick={() => setActionType('negative')}
          type="button"
        >
          Negativa
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="actionSelect">Selecione a Ação:</label>
        <select
          id="actionSelect"
          value={selectedActionId ?? ''}
          onChange={(e) => setSelectedActionId(Number(e.target.value))}
        >
          {actions.map((action) => (
            <option key={action.id} value={action.id}>
              {action.name} ({action.duration} min)
            </option>
          ))}
        </select>

        <button type="submit" disabled={isSubmitting} className={styles.actionRegister__submmitBtn}>
          {isSubmitting ? 'Registrando...' : 'Registrar Ação'}
        </button>

        <p>Não encontrou o que precisava?<br/>
          <Link 
            href={{pathname:"/actionCreate"}}
            >Registre uma nova ação
          </Link>
        </p>

        {feedback && <p>{feedback}</p>}
      </form>
    </section>
  );
}
