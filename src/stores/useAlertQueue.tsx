import { useState } from 'react';

type AlertItem = {
  id: number;
  message: string;
};

export function useAlertQueue(duration = 3000) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const addAlert = (message: string) => {
    const id = idCounter + 1;
    setIdCounter(id);
    const newAlert = { id, message };
    setAlerts((prev) => [newAlert, ...prev]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, duration);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return { alerts, addAlert, removeAlert };
}
