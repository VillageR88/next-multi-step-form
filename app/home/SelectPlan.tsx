'use client';
import { useContext } from 'react';
import { DataContext, costFormatted } from '@/app/_providers/DataContext';
import { Plan } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageArcade from '@/public/assets/images/icon-arcade.svg';
import imageAdvanced from '@/public/assets/images/icon-advanced.svg';
import imagePro from '@/public/assets/images/icon-pro.svg';

const RadioInput = ({
  id,
  title,
  costMonthly,
  costYearly,
  src,
}: {
  id: string;
  title: string;
  costMonthly: number;
  costYearly: number;
  src: string;
}) => {
  const { setPlan, billing } = useContext(DataContext);

  const discount = '2 months free';

  return (
    <label className="radioParent">
      <input
        onChange={(e) => {
          setPlan([e.target.id as Plan, billing ? costYearly : costMonthly]);
        }}
        className="absolute size-0"
        required
        type="radio"
        id={id}
        name="queryType"
      />
      <Image src={src} width={40} height={40} className="size-[40px]" alt="icon" />
      <div className="flex flex-col">
        <h2>{title}</h2>
        <p className="leading-[29px]">
          {billing
            ? costFormatted({ cost: costYearly, billing: billing })
            : costFormatted({ cost: costMonthly, billing: billing })}
        </p>
        <p className="text-[12px] text-[#022959] group-has-[input[type='checkbox']:not(:checked)]/1:hidden">
          {discount}
        </p>
      </div>
    </label>
  );
};

export default function SelectPlan() {
  const { selectPlanRef, billing, setBilling, setPlan } = useContext(DataContext);
  const items = {
    title: 'Select your plan',
    description: 'You have the option of monthly or yearly billing.',
    fields: [
      {
        id: 'arcade',
        title: 'Arcade',
        // descriptionMonthly: '$9/mo',
        // descriptionYearly: '$90/yr',
        costMonthly: 9,
        costYearly: 90,
        src: imageArcade as string,
      },
      {
        id: 'advanced',
        title: 'Advanced',
        costMonthly: 12,
        costYearly: 120,
        src: imageAdvanced as string,
      },
      {
        id: 'pro',
        title: 'Pro',
        costMonthly: 15,
        costYearly: 150,
        src: imagePro as string,
      },
    ],
  };
  const billingType = {
    monthly: 'Monthly',
    yearly: 'Yearly',
  };

  return (
    <div
      ref={selectPlanRef}
      className={`group/1 selectPlan mt-[40px] hidden h-[348px] w-full max-w-[450px] flex-col gap-[40px]`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <div className=" flex flex-col gap-[32px]">
        <ul className="flex gap-[24px]">
          {items.fields.map((field, index) => (
            <li key={index}>
              <RadioInput
                id={field.id}
                title={field.title}
                costMonthly={field.costMonthly}
                costYearly={field.costYearly}
                src={field.src}
              />
            </li>
          ))}
        </ul>
        <div className="group/2 flex h-[48px] items-center justify-center gap-[24px] rounded-[8px] bg-[#F8F9FF] *:cursor-pointer">
          <label
            htmlFor="billing"
            className="h3Label select-none text-[#022959] active:cursor-default group-has-[input:not(:checked)]/2:pointer-events-none group-has-[input:checked]/2:text-[#9699AA]"
          >
            {billingType.monthly}
          </label>
          <label
            className="flex h-[20px] w-[38px] items-center justify-center rounded-[10px] bg-[#022959]"
            htmlFor="billing"
          >
            <input
              onChange={() => {
                setBilling((prev) => !prev);
                setPlan((prev) => {
                  if (!prev) return;
                  const newPrev = { ...prev } as [Plan, number];
                  if (!newPrev[1]) return;
                  newPrev[1] = billing
                    ? items.fields.find((field) => field.id === (prev[0] as string))?.costMonthly ?? 0
                    : items.fields.find((field) => field.id === (prev[0] as string))?.costYearly ?? 0;
                  return newPrev;
                });
              }}
              title={undefined}
              className="size-[12px] -translate-x-2 cursor-pointer appearance-none rounded-full bg-white transition checked:translate-x-2"
              type="checkbox"
              id="billing"
              name="billing"
            />
          </label>
          <label
            htmlFor="billing"
            className="h3Label select-none text-[#9699AA] active:cursor-default group-has-[input:checked]/2:pointer-events-none group-has-[input:checked]/2:text-[#022959]"
          >
            {billingType.yearly}
          </label>
        </div>
      </div>
    </div>
  );
}
