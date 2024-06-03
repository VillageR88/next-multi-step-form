'use client';
import { createContext, useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { TimerValue, Package } from '@/app/_lib/interfaces';

export const DataContext = createContext(
  {} as {
    timerValue: TimerValue;
    current4thOfNextMonth: Date;
    showMessage: boolean;
    setShowMessage: Dispatch<SetStateAction<boolean>>;
    selectedOption: string;
    setSelectedOption: Dispatch<SetStateAction<string>>;
    preferredOption: Package;
    setPreferredOption: Dispatch<SetStateAction<Package>>;
  },
);
export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [preferredOption, setPreferredOption] = useState<Package>(Package.Basic);
  const current4thOfNextMonth = useMemo(() => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 4);
  }, []);
  const [timerValue, setTimerValue] = useState<TimerValue>({
    days: '00',
    hours: '00',
    mi: '00',
    sec: '00',
  });

  useEffect(() => {
    const timeFunction = () => {
      const currentDifference = current4thOfNextMonth.getTime() - new Date().getTime();
      const days = Math.floor(currentDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((currentDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((currentDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((currentDifference / 1000) % 60);
      setTimerValue({
        days: days.toLocaleString('en-UK', { minimumIntegerDigits: 2 }),
        hours: hours.toLocaleString('en-UK', { minimumIntegerDigits: 2 }),
        mi: minutes.toLocaleString('en-UK', { minimumIntegerDigits: 2 }),
        sec: seconds.toLocaleString('en-UK', { minimumIntegerDigits: 2 }),
      });
    };
    if (timerValue.days === '00' && timerValue.hours === '00' && timerValue.mi === '00' && timerValue.sec === '00') {
      timeFunction();
    }
    const interval = setInterval(() => {
      timeFunction();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [current4thOfNextMonth, timerValue.days, timerValue.hours, timerValue.mi, timerValue.sec]);
  return (
    <DataContext.Provider
      value={{
        timerValue,
        current4thOfNextMonth,
        showMessage,
        setShowMessage,
        selectedOption,
        setSelectedOption,
        preferredOption,
        setPreferredOption,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
