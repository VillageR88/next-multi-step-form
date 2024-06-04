'use client';
import { Steps } from '@/app/_providers/DataContext';
import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageArcade from '@/public/assets/images/icon-arcade.svg';
import imageAdvanced from '@/public/assets/images/icon-advanced.svg';
import imagePro from '@/public/assets/images/icon-pro.svg';

const RadioInput = ({
  id,
  title,
  description,
  src,
}: {
  id: string;
  title: string;
  description: string;
  src: string;
}) => {
  return (
    <label className="radioParent">
      <input className="absolute" required type="radio" id={id} name="queryType" />
      <Image src={src} width={40} height={40} className="size-[40px]" alt="icon" />
      <div className="flex flex-col">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </label>
  );
};

export default function SelectPlan() {
  const { currentStep, handleCheck, setHandleCheck, setCurrentStep } = useContext(DataContext);
  const thisStepName = Steps.SELECT_PLAN;
  const items = {
    title: 'Select your plan',
    description: 'You have the option of monthly or yearly billing.',
    fields: [
      {
        id: 'arcade',
        title: 'Arcade',
        description: '$9/mo',
        src: imageArcade as string,
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: '$12/mo',
        src: imageAdvanced as string,
      },
      {
        id: 'pro',
        title: 'Pro',
        description: '$15/mo',
        src: imagePro as string,
      },
    ],
  };
  return (
    <div
      className={`mt-[40px] flex h-[348px] w-full max-w-[450px] flex-col gap-[40px] ${currentStep === thisStepName ? 'block' : 'hidden'}`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <ul className="flex gap-[24px]">
        {items.fields.map((field, index) => (
          <li key={index}>
            <RadioInput id={field.id} title={field.title} description={field.description} src={field.src} />
          </li>
        ))}
      </ul>
    </div>
  );
}
