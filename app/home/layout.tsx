import { ReactNode } from 'react';
import Image from 'next/image';
import imageSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';

export default function LayoutHome({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip font-ubuntu sm:min-h-screen">
      <div className="flex h-[600px] w-[940px] items-center justify-between gap-[100px] rounded-[15px] bg-white py-[16px] pl-[16px] pr-[100px]">
        <div className="relative min-h-[568px] min-w-[274px]">
          <Image className="absolute" fill src={imageSidebarDesktop as string} alt="sidebar background image" />
        </div>
        <div className="flex size-full flex-col pb-[16px]">
          <div className="size-full">{children}</div>
          <div className="flex h-[48px] w-full justify-between">
            <button type="button" className="text-[#9699AA]">
              Go Back
            </button>
            <button type="button" className="bg-[#022959] text-white">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
