'use client';
import { useContext } from 'react';
import { DataContext, costFormatted, itemsSelectPlan } from '@/app/_providers/DataContext';
import { Plan } from '@/app/_providers/DataContext';
import Image from 'next/image';

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
  const { selectPlanRef, billing, setBilling, setPlan, setAddons } = useContext(DataContext);

  const billingType = {
    monthly: 'Monthly',
    yearly: 'Yearly',
  };
  console.log(Object.entries(itemsSelectPlan.fields).map((item) => item));
  return (
    <div
      ref={selectPlanRef}
      className={`group/1 selectPlan mt-[40px] hidden h-[348px] w-full max-w-[450px] flex-col gap-[40px]`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{itemsSelectPlan.title}</h1>
        <p>{itemsSelectPlan.description}</p>
      </header>
      <div className=" flex flex-col gap-[32px]">
        <ul className="flex gap-[24px]">
          {Object.keys(itemsSelectPlan.fields).map((key, index) => {
            const item = itemsSelectPlan.fields[key];
            return (
              <li key={index}>
                <RadioInput
                  id={key}
                  title={item.title}
                  costMonthly={item.costMonthly}
                  costYearly={item.costYearly}
                  src={item.src}
                />
              </li>
            );
          })}
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
                  const newPrev = { ...prev };
                  const planId = prev[0] as string;
                  const plan = itemsSelectPlan.fields[planId];
                  newPrev[1] = billing ? plan.costMonthly : plan.costYearly;
                  return newPrev;
                });
                setAddons((prev) => ({
                  onlineService: {
                    checked: prev.onlineService.checked,
                    cost: billing ? prev.onlineService.cost / 10 : prev.onlineService.cost * 10,
                  },
                  largerStorage: {
                    checked: prev.largerStorage.checked,
                    cost: billing ? prev.largerStorage.cost / 10 : prev.largerStorage.cost * 10,
                  },
                  customizableProfile: {
                    checked: prev.customizableProfile.checked,
                    cost: billing ? prev.customizableProfile.cost / 10 : prev.customizableProfile.cost * 10,
                  },
                }));
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
