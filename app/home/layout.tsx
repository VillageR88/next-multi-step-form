'use client';
import { ReactNode, createRef, useContext, useEffect } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageSidebarDesktop from '@/public/assets/images/bg-sidebar-desktop.svg';
import { Steps } from '@/app/_providers/DataContext';
import { useFormState, useFormStatus } from 'react-dom';
import Loader from '../components/Loader';
import { CreateInvoiceContactForm } from '@/app/_lib/functionsServer';

const titles = {
  step: 'STEP ',
  buttonPrevious: 'Go Back',
  buttonNext: 'Next Step',
  confirm: 'Confirm',
};

const SubmitButton = ({ refButtonConfirm }: { refButtonConfirm: React.RefObject<HTMLButtonElement> }) => {
  const { pending } = useFormStatus();

  return (
    <button
      ref={refButtonConfirm}
      type="submit"
      className="hidden h-[48px] w-[123px] items-center justify-center rounded-[8px] bg-[#483EFF] text-white
"
    >
      {pending ? <Loader pending={pending} /> : titles.confirm}
    </button>
  );
};

export default function LayoutHome({ children }: { children: ReactNode }) {
  const refDivButtons = createRef<HTMLDivElement>();
  const {
    yourInfoRef,
    selectPlanRef,
    addOnsRef,
    summaryRef,
    refThankYou,
    nameRef,
    mailRef,
    telRef,
    refButtonConfirm,
    refButtonNext,
    refButtonPrevious,
    plan,
    addons,
  } = useContext(DataContext);
  const sum =
    (plan && plan[1] + Object.values(addons).reduce((acc, cur) => (cur.checked ? acc + cur.cost : acc), 0)) ?? 0;
  const [state, action] = useFormState<
    {
      number: number;
      redirection: boolean;
    },
    FormData
  >((state, payload) => CreateInvoiceContactForm(state, payload, sum), {
    number: 0,
    redirection: false,
  });

  const circleArray = ['circle1', 'circle2', 'circle3', 'circle4'];

  const items = Object.values(Steps);

  const Circle = ({ index }: { index: number }) => {
    return (
      <div
        className={`${circleArray[index]} flex size-[33px] items-center justify-center rounded-full border border-white text-[14px] font-bold text-white`}
      >
        {index + 1}
      </div>
    );
  };

  useEffect(() => {
    if (state.redirection && refDivButtons.current) {
      refDivButtons.current.classList.add('hidden');
      refThankYou.current?.classList.remove('hidden');
      refThankYou.current?.classList.add('flex');
      summaryRef.current?.classList.add('hidden');
      summaryRef.current?.classList.remove('flex');
    }
  }, [refDivButtons, refThankYou, state.redirection, summaryRef]);

  return (
    <main className="group/home relative z-0 flex min-h-dvh flex-col items-center justify-center overflow-x-clip px-6 font-ubuntu sm:min-h-screen">
      <form
        action={action}
        className="flex h-[600px] w-full max-w-[940px] items-center justify-between gap-[100px] rounded-[15px] bg-white py-[16px] pl-[16px] pr-[100px]"
      >
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
          <div ref={refDivButtons} className="flex h-[48px] w-full items-center justify-between">
            <button
              onClick={() => {
                if (
                  selectPlanRef.current &&
                  selectPlanRef.current.classList.contains('selected') &&
                  yourInfoRef.current
                ) {
                  refButtonPrevious.current?.classList.add('invisible');
                  selectPlanRef.current.classList.remove('selected');
                  selectPlanRef.current.classList.add('hidden');
                  selectPlanRef.current.classList.remove('flex');
                  yourInfoRef.current.classList.add('selected');
                  yourInfoRef.current.classList.remove('hidden');
                  yourInfoRef.current.classList.add('flex');
                }
                if (addOnsRef.current && addOnsRef.current.classList.contains('selected') && selectPlanRef.current) {
                  addOnsRef.current.classList.remove('selected');
                  addOnsRef.current.classList.add('hidden');
                  addOnsRef.current.classList.remove('flex');
                  selectPlanRef.current.classList.add('selected');
                  selectPlanRef.current.classList.remove('hidden');
                  selectPlanRef.current.classList.add('flex');
                }
                if (summaryRef.current && summaryRef.current.classList.contains('selected') && addOnsRef.current) {
                  summaryRef.current.classList.remove('selected');
                  summaryRef.current.classList.add('hidden');
                  summaryRef.current.classList.remove('flex');
                  addOnsRef.current.classList.add('selected');
                  addOnsRef.current.classList.remove('hidden');
                  addOnsRef.current.classList.add('flex');
                  refButtonNext.current?.classList.remove('hidden');
                  refButtonConfirm.current?.classList.remove('flex');
                  refButtonConfirm.current?.classList.add('hidden');
                }
              }}
              ref={refButtonPrevious}
              type="button"
              className={`invisible h-[18px] w-[60px] text-[#9699AA]`}
            >
              {titles.buttonPrevious}
            </button>
            <button
              ref={refButtonNext}
              onClick={() => {
                if (
                  yourInfoRef.current &&
                  yourInfoRef.current.classList.contains('selected') &&
                  selectPlanRef.current
                ) {
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
                  if (mailRef.current && mailRef.current.value === '') {
                    mailRef.current.classList.add('errorInput');
                    mailRef.current.focus();
                    error = true;
                  }
                  if (mailRef.current && !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(mailRef.current.value)) {
                    mailRef.current.classList.add('errorInput');
                    mailRef.current.focus();
                    error = true;
                  }
                  if (nameRef.current && nameRef.current.value === '') {
                    nameRef.current.classList.add('errorInput');
                    nameRef.current.focus();
                    error = true;
                  }
                  //debug
                  if (!error) return;
                  refButtonPrevious.current?.classList.remove('invisible');
                  yourInfoRef.current.classList.remove('selected');
                  yourInfoRef.current.classList.add('hidden');
                  yourInfoRef.current.classList.remove('flex');
                  selectPlanRef.current.classList.add('selected');
                  selectPlanRef.current.classList.remove('hidden');
                  selectPlanRef.current.classList.add('flex');
                } else if (selectPlanRef.current?.classList.contains('selected') && addOnsRef.current) {
                  selectPlanRef.current.classList.remove('selected');
                  selectPlanRef.current.classList.add('hidden');
                  selectPlanRef.current.classList.remove('flex');
                  addOnsRef.current.classList.add('selected');
                  addOnsRef.current.classList.remove('hidden');
                  addOnsRef.current.classList.add('flex');
                } else if (addOnsRef.current?.classList.contains('selected') && summaryRef.current) {
                  addOnsRef.current.classList.remove('selected');
                  addOnsRef.current.classList.add('hidden');
                  addOnsRef.current.classList.remove('flex');
                  summaryRef.current.classList.add('selected');
                  summaryRef.current.classList.remove('hidden');
                  summaryRef.current.classList.add('flex');
                  refButtonNext.current?.classList.add('hidden');
                  refButtonConfirm.current?.classList.remove('hidden');
                  refButtonConfirm.current?.classList.add('flex');
                }
              }}
              type="button"
              className="h-[48px] w-[123px] rounded-[8px] bg-[#022959] text-white"
            >
              {titles.buttonNext}
            </button>
            <SubmitButton refButtonConfirm={refButtonConfirm} />
          </div>
        </div>
      </form>
    </main>
  );
}
