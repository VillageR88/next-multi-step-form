'use client';
import { ReactNode, useRef, createContext, RefObject, useState, Dispatch, SetStateAction } from 'react';

export enum Steps {
  YOUR_INFO = 'YOUR INFO',
  SELECT_PLAN = 'SELECT PLAN',
  ADD_ONS = 'ADD-ONS',
  SUMMARY = 'SUMMARY',
}

export enum Plan {
  ARCADE = 'arcade',
  ADVANCED = 'advanced',
  PRO = 'pro',
}

//const items = Object.values(Steps);
export const DataContext = createContext(
  {} as {
    yourInfoRef: RefObject<HTMLDivElement>;
    selectPlanRef: RefObject<HTMLDivElement>;
    addOnsRef: RefObject<HTMLDivElement>;
    summaryRef: RefObject<HTMLDivElement>;
    nameRef: RefObject<HTMLInputElement>;
    mailRef: RefObject<HTMLInputElement>;
    telRef: RefObject<HTMLInputElement>;
    billing: boolean;
    setBilling: Dispatch<SetStateAction<boolean>>;
    plan: Plan | undefined;
    setPlan: Dispatch<SetStateAction<Plan | undefined>>;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState(false);
  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const yourInfoRef = useRef<HTMLDivElement>(null);
  const selectPlanRef = useRef<HTMLDivElement>(null);
  const addOnsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  return (
    <DataContext.Provider
      value={{
        yourInfoRef,
        selectPlanRef,
        addOnsRef,
        summaryRef,
        nameRef,
        mailRef,
        telRef,
        billing,
        setBilling,
        plan,
        setPlan,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
