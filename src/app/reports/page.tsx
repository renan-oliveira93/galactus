"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { client } from "@/utils/client";

type ActionRegister = {
  id: number;
  date: string;
  childId: string;
  isPositive: boolean;
  positiveActionId: number | null;
  negativeActionId: number | null;
  actionTitle: string;
  duration: number;
};

export default function Reports() {
  const [date, setDate] = useState<Date | null>(null);
  const [actions, setActions] = useState<ActionRegister[]>([]);

  useEffect(() => {
    const getReport = async () => {
      if (!date) return;

      const day = date.toISOString().split("T")[0];
      const data = await client(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/dailyRecord?childId=1&date=${day}`
      );

      const actionPromises = data.map(async (report: any) => {
        if (report.positiveActionId != null) {
          const actionData = await client(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/api/positiveAction?id=${report.positiveActionId}`
          );
          return {
            id: report.id,
            date: report.date,
            childId: report.childId,
            isPositive: true,
            positiveActionId: report.positiveActionId,
            negativeActionId: null,
            actionTitle: actionData.name,
            duration: actionData.duration,
          };
        }
        if (report.negativeActionId != null) {
          const actionData = await client(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/api/negativeAction?id=${report.negativeActionId}`
          );
          return {
            id: report.id,
            date: report.date,
            childId: report.childId,
            isPositive: false,
            positiveActionId: null,
            negativeActionId: report.negativeActionId,
            actionTitle: actionData.name,
            duration: actionData.duration,
          };
        }
        return null;
      });

      const resolvedActions = (await Promise.all(actionPromises)).filter(
        (action) => action !== null
      );
      setActions(resolvedActions);
    };

    getReport();
  }, [date]);

  return (
    <section className={styles.reports}>
      <h2 className={styles.reports__title}>Relatórios</h2>
      <div className={styles.reports__datePicker}>
        <p>Selecione uma data</p>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      {actions && (
        <div>
          {actions.map((action) => (
            <div key={action.id}>
              <h3>{action.actionTitle}</h3>
              <p>Duração: {action.duration}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}