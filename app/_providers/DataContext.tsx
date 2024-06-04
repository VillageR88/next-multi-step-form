'use client';
import { ReactNode, useRef, createContext, RefObject } from 'react';

export enum Steps {
  YOUR_INFO = 'YOUR INFO',
  SELECT_PLAN = 'SELECT PLAN',
  ADD_ONS = 'ADD-ONS',
  SUMMARY = 'SUMMARY',
}

//const items = Object.values(Steps);
export const DataContext = createContext(
  {} as {
    yourInfoRef: RefObject<HTMLDivElement>;
    selectPlanRef: RefObject<HTMLDivElement>;
    addOnsRef: RefObject<HTMLDivElement>;
    summaryRef: RefObject<HTMLDivElement>;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const yourInfoRef = useRef<HTMLDivElement>(null);
  const selectPlanRef = useRef<HTMLDivElement>(null);
  const addOnsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  return (
    <DataContext.Provider
      value={{
        yourInfoRef,
        selectPlanRef,
        addOnsRef,
        summaryRef,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
