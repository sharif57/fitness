"use client"
import { createContext, useState, ReactNode } from "react";

export interface NotificationContextProps {
  showNotification: boolean;
  toggleNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextProps | null>(null);

interface NotifyNotificationChangeProps {
  children: ReactNode;
}

export default function NotifyNotificationChange({ children }: NotifyNotificationChangeProps) {
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification((prev) => !prev);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, toggleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
