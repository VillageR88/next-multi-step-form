'use client';
import { Steps } from '@/app/_providers/DataContext';
import { useContext, useEffect } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';

export default function Addons() {
  const thisStepName = Steps.ADD_ONS;

  const { currentStep, handleCheck, setCurrentStep, setHandleCheck } = useContext(DataContext);
  useEffect(() => {
    if (handleCheck && currentStep === thisStepName) {
      setCurrentStep(Steps.ADD_ONS);
      setHandleCheck(false);
    }
  }, [currentStep, handleCheck, setCurrentStep, setHandleCheck, thisStepName]);

  const items = {
    title: 'Pick add-ons',
    description: 'Add-ons help enhance your gaming experience.',
    fields: [
      {
        id: 'onlineService',
        title: 'Online service',
        description: 'Access to multiplayer games',
        cost: '$5/mo',
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: '$12/mo',
      },
      {
        id: 'pro',
        title: 'Pro',
        description: '$15/mo',
      },
    ],
  };

  return (
    <div
      className={`group/1 mt-[40px] flex h-[348px] w-full max-w-[450px] flex-col gap-[40px] ${currentStep === thisStepName ? 'block' : 'hidden'}`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <div className=" flex flex-col gap-[32px]">
        <ul className="flex gap-[24px]">
          {items.fields.map((field, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
