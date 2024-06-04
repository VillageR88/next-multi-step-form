'use client';
import { Steps } from '@/app/_providers/DataContext';
import { useContext, useEffect } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageCheckmark from '@/public/assets/images/icon-checkmark.svg';

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
        costMonthly: '+$1/mo',
        costYearly: '+$10/yr',
      },
      {
        id: 'largerstorage',
        title: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        costMonthly: '+$2/mo',
        costYearly: '+$20/yr',
      },
      {
        id: 'customizableprofile',
        title: 'Customizable profile',
        description: 'Custom theme on your profile',
        costMonthly: '+$2/mo',
        costYearly: '+$20/yr',
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
      <ul className="flex flex-col gap-[16px]">
        {items.fields.map((field, index) => (
          <li className="flex" key={index}>
            <label htmlFor={field.id} className="checkParent group flex items-center gap-[24px] px-[24px]">
              <input title={undefined} id={field.id} className="absolute size-0" type="checkbox" />
              <div className="flex h-[20px] min-w-[20px] select-none items-center justify-center rounded-[4px] border border-[#D6D9E6] bg-transparent group-has-[input:checked]:border-[#483EFF] group-has-[input:checked]:bg-[#483EFF]">
                <Image
                  alt="checkbox"
                  className="h-[9px] w-[12px]"
                  width={12}
                  height={9}
                  src={imageCheckmark as string}
                />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col gap-[7px]">
                  <h2>{field.title}</h2>
                  <p>{field.description}</p>
                </div>
                <span className="text-[14px] leading-[20px] text-[#483EFF]">{field.costMonthly}</span>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
