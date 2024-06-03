'use client';

import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
export default function Timer({
  textColor1,
  textColor2,
  textColor3,
  backgroundColor,
  moreGap,
}: {
  textColor1: string;
  textColor2: string;
  textColor3: string;
  backgroundColor: string;
  moreGap?: boolean;
}) {
  const { timerValue, current4thOfNextMonth } = useContext(DataContext);
  return (
    <div
      className={`flex flex-col items-center justify-between ${moreGap ? 'gap-[18px]' : 'gap-[8px]'} text-center lg:items-start screenInBetween:gap-0 screenInBetween:text-start`}
    >
      <span className={`text-[16px] font-bold leading-[48px] tracking-[5px] ${textColor1}`}>
        COMING{' '}
        <span className="text-[#5175FF]">
          {current4thOfNextMonth
            .toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' })
            .toUpperCase()}
        </span>
      </span>
      <div className="grid gap-[6px] evenSmallerScreen:grid-cols-2 verySmallScreen:flex verySmallScreen:gap-[16px] md:h-[128px] md:w-[448px]">
        {Object.keys(timerValue).map((key) => (
          <div
            className={`flex h-[92px] w-[72px] flex-col items-center justify-center rounded-[13px] md:h-[128px] md:w-[100px] md:gap-[2px] ${backgroundColor} pt-[6px] md:pt-[16px]`}
            key={key}
          >
            <span className={`text-[32px] font-bold leading-[38px] md:text-[56px] md:leading-[48px] ${textColor2}`}>
              {timerValue[key as keyof typeof timerValue]}
            </span>
            <span className={`text-[12px] font-bold leading-[28px] md:text-[16px] ${textColor3}`}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
