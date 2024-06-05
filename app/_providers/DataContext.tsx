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

export interface tAddons {
  onlineService: { checked: boolean; cost: number };
  largerStorage: { checked: boolean; cost: number };
  customizableProfile: { checked: boolean; cost: number };
}

export const costFormatted = ({
  cost,
  billing,
  prefixWithPlus,
}: {
  cost: number | undefined;
  billing: boolean;
  prefixWithPlus?: boolean;
}): string | undefined => {
  if (!cost) return;
  const firstPart = `$${cost.toString()}`;
  const secondPart = billing ? '/yr' : '/mo';
  if (prefixWithPlus) return `+${firstPart + secondPart}`;
  else return firstPart + secondPart;
};

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
    plan: [Plan, number] | undefined;
    setPlan: Dispatch<SetStateAction<[Plan, number] | undefined>>;
    addons: {
      onlineService: { checked: boolean; cost: number };
      largerStorage: { checked: boolean; cost: number };
      customizableProfile: { checked: boolean; cost: number };
    };
    setAddons: Dispatch<
      SetStateAction<{
        onlineService: { checked: boolean; cost: number };
        largerStorage: { checked: boolean; cost: number };
        customizableProfile: { checked: boolean; cost: number };
      }>
    >;
  },
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState(false);
  const [plan, setPlan] = useState<[Plan, number] | undefined>(undefined);
  const [addons, setAddons] = useState<{
    onlineService: { checked: boolean; cost: number };
    largerStorage: { checked: boolean; cost: number };
    customizableProfile: { checked: boolean; cost: number };
  }>({
    onlineService: { checked: false, cost: 1 },
    largerStorage: { checked: false, cost: 2 },
    customizableProfile: { checked: false, cost: 2 },
  });

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
        addons,
        setAddons,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
