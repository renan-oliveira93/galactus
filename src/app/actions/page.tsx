'use client';
import { useEffect, useState } from "react";
import styles from "../../styles/index.module.scss";
import { client } from "@/utils/client";
import { Action } from "@/types/Action";

export default function Actions() {
    const [activeTab, setActiveTab] = useState(1);
    const [actions, setActions] = useState<Action[] | undefined>();
    useEffect(() => {
        const getMinutes = async (activeTab: number) => {
          const action = activeTab === 1 ? 'positiveAction' : 'negativeAction';
          const data = await client(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/${action}/`)
          if (Array.isArray(data)) {
            setActions(data);
          } else {
            console.error("Erro ao buscar ações:", data?.error || data);
            setActions([]);
          }
        };    
        getMinutes(activeTab);
      }, [activeTab]);
    return (
      <>
        <section className={styles.actions}>
          <nav className={styles.mainCard__content}>
            <button
              className={`${styles.mainCard__content__btn} ${activeTab === 1 ? styles.active : ''}`}
              onClick={() => setActiveTab(1)}
            >
              Ações Positivas
            </button>
            <button
              className={`${styles.mainCard__content__btn} ${activeTab === 2 ? styles.active : ''}`}
              onClick={() => setActiveTab(2)}
            >
              Ações Negativas
            </button>
          </nav>

          {actions && (
            <table className={styles.actions__table}>
              <thead className={styles.actions__table__head}>
                <tr>
                  <th>Ação</th>
                  <th>Tempo</th>
                </tr>
              </thead>
              <tbody>
                {actions?.map((action: Action) => (
                  <tr key={action.id}>
                    <td>{action.name}</td>
                    <td>{action.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
        </section>
      </>
    );
  }