'use client';
import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';

export default function Summary() {
  const { summaryRef } = useContext(DataContext);

  const items = {
    title: 'Finishing up',
    description: 'Double-check everything looks OK before confirming.',
    plan: {
      arcade: {
        title: 'Arcade',
        costMonthly: '$9/mo',
        costYearly: '$90/yr',
      },
      advanced: {
        title: 'Advanced',
        costMonthly: '$12/mo',
        costYearly: '$120/yr',
      },
      pro: {
        title: 'Pro',
        costMonthly: '$15/mo',
        costYearly: '$150/yr',
      },
    },
    billing: {
      monthly: ' (Monthly)',
      yearly: ' (Yearly)',
    },
  };

  const PlanTitle = () => (
    <>
      {document.getElementById('arcade')?.checked && <span>{items.plan.arcade.title}</span>}
      {document.getElementById('advanced')?.checked && <span>{items.plan.advanced.title}</span>}
      {document.getElementById('pro')?.checked && <span>{items.plan.pro.title}</span>}
    </>
  );

  const Billing = () => (
    <>
      {document.getElementById('billing')?.checked ? (
        <span>{items.billing.yearly}</span>
      ) : (
        <span>{items.billing.monthly}</span>
      )}
    </>
  );

  return (
    <div
      ref={summaryRef}
      className={`group/1 summary mt-[40px] hidden h-[348px] w-full max-w-[450px] flex-col gap-[40px]`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <div className="flex flex-col">
        <h2>
          <PlanTitle /> <Billing />
        </h2>
      </div>
    </div>
  );
}
