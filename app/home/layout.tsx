'use client';
import { ReactNode, useContext, useRef } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';
import { Steps } from '@/app/_providers/DataContext';

export default function LayoutHome({ children }: { children: ReactNode }) {
  const { yourInfoRef, selectPlanRef, addOnsRef, summaryRef, nameRef, mailRef, telRef } = useContext(DataContext);
  const refArray = ['circle1', 'circle2', 'circle3', 'circle4'];

  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const items = Object.values(Steps);
  const titles = {
    step: 'STEP ',
    buttonPrevious: 'Go Back',
    buttonNext: 'Next Step',
  };
  const Circle = ({ index }: { index: number }) => {
    return (
      <div
        className={`${refArray[index]} flex size-[33px] items-center justify-center rounded-full border border-white text-[14px] font-bold text-white`}
      >
        {index + 1}
      </div>
    );
  };

  return (
    <main className="group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip px-6 font-ubuntu sm:min-h-screen">
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
                <Circle index={index} />
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
                if (selectPlanRef.current?.classList.contains('selected')) {
                  previousButtonRef.current?.classList.add('invisible');
                  selectPlanRef.current.classList.remove('selected');
                  selectPlanRef.current.classList.add('hidden');
                  selectPlanRef.current.classList.remove('flex');
                  yourInfoRef.current?.classList.add('selected');
                  yourInfoRef.current?.classList.remove('hidden');
                  yourInfoRef.current?.classList.add('flex');
                  nextButtonRef.current?.classList.remove('invisible');
                }
                if (addOnsRef.current?.classList.contains('selected')) {
                  addOnsRef.current.classList.remove('selected');
                  addOnsRef.current.classList.add('hidden');
                  addOnsRef.current.classList.remove('flex');
                  selectPlanRef.current?.classList.add('selected');
                  selectPlanRef.current?.classList.remove('hidden');
                  selectPlanRef.current?.classList.add('flex');
                }
                if (summaryRef.current?.classList.contains('selected')) {
                  summaryRef.current.classList.remove('selected');
                  summaryRef.current.classList.add('hidden');
                  summaryRef.current.classList.remove('flex');
                  addOnsRef.current?.classList.add('selected');
                  addOnsRef.current?.classList.remove('hidden');
                  addOnsRef.current?.classList.add('flex');
                }
              }}
              ref={previousButtonRef}
              type="button"
              className={`invisible h-[18px] w-[60px] text-[#9699AA]`}
            >
              {titles.buttonPrevious}
            </button>
            <button
              ref={nextButtonRef}
              onClick={() => {
                if (yourInfoRef.current?.classList.contains('selected')) {
                  let error = false;
                  if (telRef.current?.value === '') {
                    telRef.current.classList.add('errorInput');
                    telRef.current.focus();
                    error = true;
                  }
                  let telFormatted = telRef.current?.value;
                  if (telFormatted) {
                    telFormatted = telFormatted.replaceAll(' ', '');
                    telFormatted = telFormatted.replaceAll('-', '');
                    telFormatted = telFormatted.replaceAll('+', '');
                    telFormatted = telFormatted.replaceAll('(', '');
                    telFormatted = telFormatted.replaceAll(')', '');
                  }
                  if (telRef.current && telFormatted && !/^\d{7,15}$/.test(telFormatted)) {
                    telRef.current.classList.add('errorInput');
                    telRef.current.focus();
                    error = true;
                  }
                  if (mailRef.current?.value === '') {
                    mailRef.current.classList.add('errorInput');
                    mailRef.current.focus();
                    error = true;
                  }
                  if (mailRef.current && !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(mailRef.current.value)) {
                    mailRef.current.classList.add('errorInput');
                    mailRef.current.focus();
                    error = true;
                  }
                  if (nameRef.current?.value === '') {
                    nameRef.current.classList.add('errorInput');
                    nameRef.current.focus();
                    error = true;
                  }
                  if (error) return;
                  previousButtonRef.current?.classList.remove('invisible');
                  yourInfoRef.current.classList.remove('selected');
                  yourInfoRef.current.classList.add('hidden');
                  yourInfoRef.current.classList.remove('flex');
                  selectPlanRef.current?.classList.add('selected');
                  selectPlanRef.current?.classList.remove('hidden');
                  selectPlanRef.current?.classList.add('flex');
                } else if (selectPlanRef.current?.classList.contains('selected')) {
                  selectPlanRef.current.classList.remove('selected');
                  selectPlanRef.current.classList.add('hidden');
                  selectPlanRef.current.classList.remove('flex');
                  addOnsRef.current?.classList.add('selected');
                  addOnsRef.current?.classList.remove('hidden');
                  addOnsRef.current?.classList.add('flex');
                } else if (addOnsRef.current?.classList.contains('selected')) {
                  addOnsRef.current.classList.remove('selected');
                  addOnsRef.current.classList.add('hidden');
                  addOnsRef.current.classList.remove('flex');
                  summaryRef.current?.classList.add('selected');
                  summaryRef.current?.classList.remove('hidden');
                  summaryRef.current?.classList.add('flex');
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
