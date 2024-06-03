'use client';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import imageSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';

export default function LayoutHome({ children }: { children: ReactNode }) {
  enum Steps {
    YOUR_INFO = 'YOUR INFO',
    SELECT_PLAN = 'SELECT PLAN',
    ADD_ONS = 'ADD-ONS',
    SUMMARY = 'SUMMARY',
  }
  const circleDisplay = {
    normal: 'text-white border-white',
    selected: 'text-[#022959] bg-[#BEE2FD] border-[#BEE2FD]',
  };
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.YOUR_INFO);
  const items = [Steps.YOUR_INFO, Steps.SELECT_PLAN, Steps.ADD_ONS, Steps.SUMMARY];
  const titles = {
    step: 'STEP ',
    buttonPrevious: 'Go Back',
    buttonNext: 'Next Step',
  };

  return (
    <main className="relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip px-6 font-ubuntu sm:min-h-screen">
      <form className="flex h-[600px] w-full max-w-[940px] items-center justify-between gap-[100px] rounded-[15px] bg-white py-[16px] pl-[16px] pr-[100px]">
        <div className="relative min-h-[568px] min-w-[274px]">
          <Image
            priority
            className="absolute"
            fill
            src={imageSidebarDesktop as string}
            alt="sidebar background image"
          />
          <ul className="relative z-10 mt-[40px] flex h-[228px] flex-col gap-[32px] pl-[32px]">
            {Object.values(items).map((item, index) => (
              <li key={index} className="flex h-[33px] items-center gap-[16px]">
                <div
                  className={`${currentStep === item ? circleDisplay.selected : circleDisplay.normal} flex size-[33px] items-center justify-center rounded-full border text-[14px] font-bold`}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#ABBCFF]">{titles.step + [index + 1].toString()}</span>
                  <span className="text-[14px] font-bold text-white">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex size-full flex-col pb-[16px]">
          <div className="size-full">{children}</div>
          <div className="flex h-[48px] w-full items-center justify-between">
            <button
              onClick={() => {
                const currentIndex = items.indexOf(currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(items[currentIndex - 1]);
                }
              }}
              type="button"
              className={`h-[18px] w-[60px] text-[#9699AA] ${items[0] === currentStep ? 'invisible' : 'visible'}`}
            >
              {titles.buttonPrevious}
            </button>
            <button
              onClick={() => {
                const currentIndex = items.indexOf(currentStep);
                if (currentIndex < items.length - 1) {
                  setCurrentStep(items[currentIndex + 1]);
                }
              }}
              type="button"
              className="h-[48px] w-[123px] rounded-[8px] bg-[#022959] text-white"
            >
              {titles.buttonNext}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
