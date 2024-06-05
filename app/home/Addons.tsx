'use client';
import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageCheckmark from '@/public/assets/images/icon-checkmark.svg';
import type { tAddons } from '@/app/_providers/DataContext';

export default function Addons() {
  const { addOnsRef, billing, setAddons } = useContext(DataContext);

  const items = {
    title: 'Pick add-ons',
    description: 'Add-ons help enhance your gaming experience.',
    fields: [
      {
        id: 'onlineService',
        title: 'Online service',
        description: 'Access to multiplayer games',
        costMonthly: 1,
      },
      {
        id: 'largerStorage',
        title: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        costMonthly: 1,
      },
      {
        id: 'customizableProfile',
        title: 'Customizable profile',
        description: 'Custom theme on your profile',
        costMonthly: 2,
      },
    ],
  };

  const formatCost = (cost: number) => {
    const amount = billing ? cost * 10 : cost;
    const prefix = '+$';
    const appendix = billing ? '/yr' : '/mo';
    return `${prefix}${amount.toString()}${appendix}`;
  };

  return (
    <div
      ref={addOnsRef}
      className={`group/1 addons mt-[40px] hidden h-[348px] w-full max-w-[450px] flex-col gap-[40px]`}
    >
      <header className="flex h-[68px] flex-col gap-[11px]">
        <h1>{items.title}</h1>
        <p>{items.description}</p>
      </header>
      <ul className="flex flex-col gap-[16px]">
        {items.fields.map((field, index) => (
          <li className="flex" key={index}>
            <label htmlFor={field.id} className="checkParent group flex items-center gap-[24px] px-[24px]">
              <input
                onChange={(e) => {
                  setAddons(
                    (prev: tAddons) =>
                      ({
                        ...prev,
                        [field.id]: {
                          checked: e.target.checked,
                          cost: billing ? field.costMonthly * 10 : field.costMonthly,
                        },
                      }) as tAddons,
                  );
                }}
                title={undefined}
                id={field.id}
                className="absolute size-0"
                type="checkbox"
              />
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
                <span className="addonCost">{formatCost(field.costMonthly)}</span>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
