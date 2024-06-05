'use client';
import { useContext } from 'react';
import { DataContext, costFormatted } from '@/app/_providers/DataContext';

export default function Summary() {
  const { summaryRef, billing, plan, selectPlanRef, addons } = useContext(DataContext);

  const items = {
    title: 'Finishing up',
    description: 'Double-check everything looks OK before confirming.',
    plan: {
      arcade: {
        title: 'Arcade',
      },
      advanced: {
        title: 'Advanced',
      },
      pro: {
        title: 'Pro',
      },
    },
    billing: {
      monthly: ' (Monthly)',
      yearly: ' (Yearly)',
    },
    addons: {
      onlineService: {
        id: 'onlineService',
        title: 'Online service',
        condition: addons.onlineService.checked,
      },
      largerStorage: {
        id: 'largerStorage',
        title: 'Larger storage',
        condition: addons.largerStorage.checked,
      },
      customizableProfile: {
        id: 'customizableProfile',
        title: 'Customizable profile',
        condition: addons.customizableProfile.checked,
      },
    },
  };

  const billingText = billing ? items.billing.yearly : items.billing.monthly;
  return (
    <div
      ref={summaryRef}
      className={`group/1 summary mt-[40px] hidden h-[348px] w-full max-w-[450px] flex-col gap-[40px]`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <div className="flex flex-col gap-[24px] rounded-[8px] bg-[#F8F9FF] px-[24px] pb-[24px] pt-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[7px]">
            <h2>{plan && plan[0][0].toUpperCase() + plan[0].slice(1) + billingText.toString()}</h2>
            <button
              onClick={() => {
                if (!summaryRef.current || !selectPlanRef.current) return;
                summaryRef.current.classList.remove('selected');
                summaryRef.current.classList.add('hidden');
                summaryRef.current.classList.remove('flex');
                selectPlanRef.current.classList.add('selected');
                selectPlanRef.current.classList.remove('hidden');
                selectPlanRef.current.classList.add('flex');
              }}
              type="button"
              className="w-fit text-[14px] leading-[20px] text-[#9699AA] underline underline-offset-2"
            >
              Change
            </button>
          </div>
          <p className="text-[16px] font-bold text-[#022959]">
            {costFormatted({
              cost: plan?.[1],
              billing,
            })}
          </p>
        </div>
        {(addons.onlineService.checked || addons.largerStorage.checked || addons.customizableProfile.checked) && (
          <div className="flex flex-col gap-[16px] text-[14px] text-[#9699AA]">
            <div className="h-px w-full bg-[#9699AA]/20"></div>
            {Object.keys(items.addons).map((key) => {
              const addon = items.addons[key as keyof typeof items.addons];
              return (
                addon.condition && (
                  <div key={key} className="flex justify-between">
                    <p>{addon.title}</p>
                    <p className="text-[#022959]">{Object.entries(addons).filter((x) => x[0] === key)[0][1].cost}</p>
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
//Object.entries(addons).filter((x) => x[0] === key)[0][1].cost
