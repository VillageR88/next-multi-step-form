import { ReactNode } from 'react';
import Image from 'next/image';
import imageSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';

export default function LayoutHome({ children }: { children: ReactNode }) {
  const items = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'];
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
                <div className="flex size-[33px] items-center justify-center rounded-full text-[14px] font-bold text-white outline outline-1 outline-white">
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
            <button type="button" className="h-[18px] w-[60px] text-[#9699AA]">
              {titles.buttonPrevious}
            </button>
            <button type="button" className="h-[48px] w-[123px] rounded-[8px] bg-[#022959] text-white">
              {titles.buttonNext}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
