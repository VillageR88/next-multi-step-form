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
    stageCheck: boolean[];
    setStageCheck: Dispatch<SetStateAction<boolean[]>>;
    currentStep: Steps;
    setCurrentStep: Dispatch<SetStateAction<Steps>>;
  },
);
export default function DataProvider({ children }: { children: ReactNode }) {
  const [stageCheck, setStageCheck] = useState<boolean[]>(new Array(items.length).fill(false));
  const [currentStep, setCurrentStep] = useState<Steps>(items[0]);
  return (
    <DataContext.Provider
      value={{
        stageCheck,
        setStageCheck,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
