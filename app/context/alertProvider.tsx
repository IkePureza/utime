import React, { useState, createContext } from "react";

export enum AlertStatus {
  SUCCESS,
  ERROR,
  NONE,
}

interface AlertProviderProps {
  alert: AlertStatus;
  alertText: string;
  success: (text: string, timeout: number) => void;
  error: (text: string, timeout: number) => void;
  clear: () => void;
}

const AlertContext = createContext<AlertProviderProps | null>(null);
AlertContext.displayName = "AlertContext";

const AlertProvider = ({ children }: any) => {
  const [alert, setAlert] = useState(AlertStatus.NONE);
  const [alertText, setAlertText] = useState("");

  return (
    <AlertContext.Provider
      value={{
        alert: alert,
        alertText: alertText,
        success: (text: string, timeout: number) => {
          setAlertText(text);
          setAlert(AlertStatus.SUCCESS);
          setTimeout(() => {
            setAlert(AlertStatus.NONE);
          }, timeout * 1000 || 10000);
        },
        error: (text: string, timeout: number) => {
          setAlertText(text);
          setAlert(AlertStatus.ERROR);
          setTimeout(() => {
            setAlert(AlertStatus.NONE);
          }, timeout * 1000 || 10000);
        },
        clear: () => setAlert(AlertStatus.NONE),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;
