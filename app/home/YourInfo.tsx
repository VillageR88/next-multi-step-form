'use client';
import { Steps } from '@/app/_providers/DataContext';
import { useEffect, useContext, useRef } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
export default function YourInfo() {
  const field1Ref = useRef<HTMLInputElement>(null);
  const field2Ref = useRef<HTMLInputElement>(null);
  const field3Ref = useRef<HTMLInputElement>(null);
  const thisStepName = Steps.YOUR_INFO;
  const { currentStep, handleCheck, setHandleCheck, setCurrentStep } = useContext(DataContext);
  const items = {
    title: 'Personal info',
    description: 'Please provide your name, email address, and phone number.',
    field1: {
      id: 'name',
      label: 'Name',
      placeholder: 'e.g. Stephen King',
      type: 'text',
    },
    field2: {
      id: 'email',
      label: 'Email Address',
      placeholder: 'e.g. stephenking@lorem.com',
      type: 'email',
    },
    field3: {
      id: 'tel',
      label: 'Phone Number',
      placeholder: 'e.g. +1 234 567 890',
      type: 'tel',
    },
  };
  useEffect(() => {
    if (handleCheck && currentStep === thisStepName) {
      const validate = () => {
        const name = field1Ref.current?.value;
        const email = field2Ref.current?.value;
        const tel = field3Ref.current?.value;
        if (name && email && tel) {
          setCurrentStep(Steps.SELECT_PLAN);
        }
      };
      validate();
      setHandleCheck(false);
    }
  }, [currentStep, handleCheck, setCurrentStep, setHandleCheck, thisStepName]);

  return (
    <div
      className={`mt-[40px] flex h-[348px] w-full max-w-[450px] flex-col gap-[40px] ${currentStep === thisStepName ? 'block' : 'hidden'}`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <div className="flex h-[264px] w-full flex-col gap-[24px]">
        <div className="inputDiv">
          <label htmlFor={items.field1.id}>{items.field1.label}</label>
          <input
            ref={field1Ref}
            id={items.field1.id}
            name={items.field1.id}
            type={items.field1.type}
            placeholder={items.field1.placeholder}
            autoComplete="name"
          />
        </div>
        <div className="inputDiv">
          <label htmlFor={items.field2.id}>{items.field2.label}</label>
          <input
            ref={field2Ref}
            id={items.field2.id}
            name={items.field2.id}
            type={items.field2.type}
            placeholder={items.field2.placeholder}
            autoComplete="email"
          />
        </div>
        <div className="inputDiv">
          <label htmlFor={items.field3.id}>{items.field3.label}</label>
          <input
            ref={field3Ref}
            id={items.field3.id}
            name={items.field3.id}
            type={items.field3.type}
            placeholder={items.field3.placeholder}
            autoComplete="tel"
          />
        </div>
      </div>
    </div>
  );
}
