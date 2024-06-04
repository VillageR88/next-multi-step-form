'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export enum Steps {
  YOUR_INFO = 'YOUR INFO',
  SELECT_PLAN = 'SELECT PLAN',
  ADD_ONS = 'ADD-ONS',
  SUMMARY = 'SUMMARY',
}

const items = Object.values(Steps);

export const DataContext = createContext(
  {} as {
    currentStep: Steps;
    setCurrentStep: Dispatch<SetStateAction<Steps>>;
    handleCheck: boolean;
    setHandleCheck: Dispatch<SetStateAction<boolean>>;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Steps>(items[0]);
  const [handleCheck, setHandleCheck] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        handleCheck,
        setHandleCheck,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
