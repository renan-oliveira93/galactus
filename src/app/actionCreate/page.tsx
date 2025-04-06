'use client';

import { useState } from "react";
import styles from "../../styles/index.module.scss";

export default function ActionCreate() {
  const [type, setType] = useState<'positive' | 'negative'>('positive');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('');

    const endpoint = type === 'positive'
      ? '/api/positiveAction'
      : '/api/negativeAction';

    const payload = {
      name,
      duration: Number(duration),
      description,
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setFeedback('Ação cadastrada com sucesso!');
        setName('');
        setDuration('');
        setDescription('');
      } else {
        setFeedback('Erro ao cadastrar ação.');
      }
    } catch (err) {
      console.error(err);
      setFeedback('Erro de conexão com o servidor.');
    }
  };

  return (
    <section className={styles.actionCreate}>
      <h2 className={styles.actionCreate__title}>Cadastrar Nova Ação</h2>

      <div className={styles.actionCreate__tabs}>
        <button
          onClick={() => setType('positive')}
          className={type === 'positive' ? styles.active : ''}
        >
          Positiva
        </button>
        <button
          onClick={() => setType('negative')}
          className={type === 'negative' ? styles.active : ''}
        >
          Negativa
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Nome da Ação
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Duração (minutos)
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.actionRegister__submmitBtn}>Cadastrar</button>

        {feedback && (
          <p className={feedback.includes('sucesso') ? 'success' : 'error'}>
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}
