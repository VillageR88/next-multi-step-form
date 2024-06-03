'use client';

import Image from 'next/image';
import logo from '@/public/assets/shared/logo.svg';
import iconArrow from '@/public/assets/sign-up/icon-arrow-down.svg';
import iconCross from '@/public/assets/sign-up/icon-cross.svg';
import iconCheck from '@/public/assets/sign-up/icon-check.svg';
import Timer from '../components/Timer';
import { useEffect, useState, useRef, useMemo } from 'react';
import { CreateInvoiceContactForm } from '@/app/_lib/functionsServer';
import { useFormState, useFormStatus } from 'react-dom';
import type { ErrorData } from '@/app/_lib/interfaces';
import Loader from '../components/Loader';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/routes';
import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import { Package } from '@/app/_lib/interfaces';

function CustomSelect({ buttonRef }: { buttonRef: React.RefObject<HTMLButtonElement> }) {
  const { preferredOption } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Package>(preferredOption);
  const listboxRef = useRef<HTMLLIElement[]>([]);
  const options = useMemo(
    () => [
      { value: Package.Basic, label1: Package.Basic, label2: 'Free' },
      { value: Package.Pro, label1: Package.Pro, label2: '$9.99', label3: '$4.99' },
      { value: Package.Ultimate, label1: Package.Ultimate, label2: '$19.99', label3: '$9.99' },
    ],
    [],
  );
  const optionsIndex = options.findIndex((option) => option.value === selectedOption);
  const handleOptionClick = (value: Package) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [buttonRef, isOpen]);

  useEffect(() => {
    if (isOpen) listboxRef.current[optionsIndex]?.focus();
  }, [isOpen, optionsIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpen) setIsOpen(false);
      }
      if (isOpen) {
        if (event.key === 'ArrowDown' || event.key === 'Tab') {
          event.preventDefault();
          const nextIndex = optionsIndex + 1 >= options.length ? 0 : optionsIndex + 1;
          setSelectedOption(options[nextIndex].value);
        }
        if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
          event.preventDefault();
          const nextIndex = optionsIndex - 1 < 0 ? options.length - 1 : optionsIndex - 1;
          setSelectedOption(options[nextIndex].value);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, options, optionsIndex]);

  return (
    <div className="relative">
      <button
        value={selectedOption}
        key={'select-button'}
        ref={buttonRef}
        id="select-button"
        name="select-button"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-listbox"
        className="h-[69px] w-full px-4 text-left text-black"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <span className="text-[#333950]">{options.find((option) => option.value === selectedOption)?.label1}</span>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span
                className={`text-[#333950]/40 ${
                  options.find((option) => option.value === selectedOption)?.label3
                    ? 'line-through decoration-[#F05B5B]'
                    : ''
                }`}
              >
                {options.find((option) => option.value === selectedOption)?.label2}
              </span>
              <span
                className={
                  options.find((option) => option.value === selectedOption)?.label3 ? 'text-[#F05B5B]' : 'hidden'
                }
              >
                {options.find((option) => option.value === selectedOption)?.label3}
              </span>
            </div>
          </div>
          <Image
            className={`ml-2 h-[8px] w-[13px] transition duration-[300] ${isOpen ? 'scale-100' : 'scale-[-100%]'}`}
            width={13}
            height={8}
            src={iconArrow as string}
            alt="arrow icon"
          />
        </div>
      </button>
      <ul
        id="select-listbox"
        title={selectedOption}
        role="listbox"
        className={`${isOpen ? 'z-auto opacity-100' : '-z-10 opacity-0'} absolute ml-[-1%] mt-[8px] flex w-[102%] flex-col divide-y divide-[#747B95]/25 rounded-[8px] border border-[#333950]/15 bg-white shadow-2xl transition duration-[200]`}
      >
        {options.map((option, index) => (
          <li
            ref={(element) => {
              if (!element) return;
              listboxRef.current[index] = element;
            }}
            tabIndex={isOpen ? 0 : -1}
            title={option.label1}
            key={index}
            value={option.value}
            role="option"
            aria-selected={option.value === selectedOption ? 'true' : 'false'}
            onClick={() => {
              handleOptionClick(option.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleOptionClick(option.value);
              }
            }}
            className={`${index === 0 ? 'rounded-t-[8px]' : index === options.length - 1 ? 'rounded-b-[8px]' : ''} flex h-[67px] cursor-pointer items-center justify-between px-[20px] text-[16px] font-bold hover:bg-[#5175FF]/10 sm:px-[32px]`}
          >
            <div className="flex items-center gap-[8px]">
              <span className="text-[#11121a]">{option.label1}</span>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className={`text-[#333950]/40 ${option.label3 ? 'line-through decoration-[#F05B5B]' : ''}`}>
                  {option.label2}
                </span>
                <span className={`text-[#333950] ${option.label3 ? 'text-[#F05B5B]' : ''}`}>{option.label3}</span>
              </div>
            </div>
            <Image
              className={`ml-2 h-[12px] w-[15px] ${option.value === selectedOption ? 'block' : 'hidden'}`}
              width={15}
              height={12}
              src={iconCheck as string}
              alt="check icon"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mt-[40px] flex h-[56px] w-full items-center justify-center bg-[#5175FF] transition-colors hover:bg-[#829CFF]"
    >
      {pending ? <Loader pending={pending} /> : 'Get on the list'}
    </button>
  );
};

export default function SignUp() {
  const { setShowMessage, setSelectedOption } = useContext(DataContext);
  //trackedErrors is used to hide input's error when input changes - it's kind of clean up
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [trackedErrors, setTrackedErrors] = useState<{
    name: number;
    email: number;
    phone: number;
    company: number;
  }>({
    name: 0,
    email: 0,
    phone: 0,
    company: 0,
  });
  const [state, action] = useFormState<
    {
      errorData: ErrorData;
      number: number;
      redirection: boolean;
    },
    FormData
  >((state, payload) => CreateInvoiceContactForm(state, payload, buttonRef.current?.value), {
    errorData: { name: false, email: false, phone: false, company: false },
    number: 0,
    redirection: false,
  });
  if (state.redirection) {
    if (buttonRef.current) setSelectedOption(buttonRef.current.value);
    setShowMessage(true);
    router.push(Routes.home);
  }
  const firstColItems = {
    title: 'Work smarter. Save time.',
    description:
      'Easily manage your projects. Get on the list and receive in-app perks available only to early subscribers. We are moving into final development and getting ready for official launch soon.',
  };

  return (
    <main className="relative z-0 flex min-h-dvh justify-center overflow-x-clip px-10 font-kumbhSans sm:min-h-screen">
      <div className="absolute -z-10 flex size-full flex-col bg-[#FAFAFA] lg:flex-row">
        <div className="flex min-h-full flex-col items-start bg-[#FAFAFA] bg-[url('../public/assets/home/bg-pattern-header.svg')] bg-[length:458px] bg-[50%_-135px] bg-no-repeat lg:w-[calc(50%)] lg:bg-none lg:bg-no-repeat"></div>
        <div className="mt-[-250px] min-h-[380px] bg-[#25293A] bg-[url('../public/assets/sign-up/bg-pattern-side.svg')] bg-[length:1540px] bg-[50%_50%] bg-no-repeat lg:ml-[600px] lg:mt-0 lg:min-h-full lg:w-1/2 lg:bg-[length:auto] lg:bg-[calc(0%-760px)_calc(0%-780px)]"></div>
      </div>
      <div className="flex w-full max-w-[1110px] flex-col items-center pb-0 lg:items-stretch lg:pb-12">
        <Image
          className="mt-[81px] h-[30px] w-[155px]"
          width={155}
          height={30}
          src={logo as string}
          alt="logo"
          priority
        />
        <div className="flex flex-col items-center justify-between lg:flex-row lg:items-start lg:gap-[60px] xl:gap-[125px]">
          <div className="mt-[80px] flex w-full max-w-[540px] flex-col gap-[40px] md:mt-[104px] lg:mt-[154px]">
            <section className="flex flex-col items-center gap-[24px] text-center lg:items-start lg:text-start">
              <h1 className="text-[#333950]">{firstColItems.title}</h1>
              <p className="text-[#747B95]">{firstColItems.description}</p>
            </section>
            <Timer
              moreGap
              textColor1="text-[#333950]"
              textColor2="text-[#5175FF]"
              textColor3="text-[#333950]/50"
              backgroundColor="bg-[#5175FF]/10"
            />
          </div>
          <form
            noValidate
            action={action}
            className="mt-[64px] flex min-h-[508px] w-full flex-col items-center rounded-[13px] bg-[#FFFFFF] px-[43px] pt-[16px] shadow-[0_30px_30px_-12px_rgba(75,92,154,0.25)] sm:w-fit sm:min-w-[445px] md:mt-[104px] lg:mt-[126px]"
          >
            <div
              className={`inputDiv ${state.errorData.name && trackedErrors.name !== state.number ? 'border-[#F05B5B] text-[#F05B5B]' : 'border-[#747B95]/50 text-[#333950]'}`}
            >
              <input
                onChange={() => {
                  setTrackedErrors({ ...trackedErrors, name: state.number });
                }}
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="name"
              />
              <Image
                className={state.errorData.name && trackedErrors.name !== state.number ? 'block' : 'hidden'}
                src={iconCross as string}
                alt="cross icon"
                width={20}
                height={20}
              />
            </div>
            <div
              className={`inputDiv ${state.errorData.email && trackedErrors.email !== state.number ? 'border-[#F05B5B] text-[#F05B5B]' : 'border-[#747B95]/50 text-[#333950]'}`}
            >
              <input
                onChange={() => {
                  setTrackedErrors({ ...trackedErrors, email: state.number });
                }}
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
              />
              <Image
                className={state.errorData.email && trackedErrors.email !== state.number ? 'block' : 'hidden'}
                src={iconCross as string}
                alt="cross icon"
                width={20}
                height={20}
              />
            </div>
            <div className="w-full border-b border-[#747B95]/50">
              <CustomSelect buttonRef={buttonRef} />
            </div>
            <div
              className={`inputDiv ${state.errorData.phone && trackedErrors.phone !== state.number ? 'border-[#F05B5B] text-[#F05B5B]' : 'border-[#747B95]/50 text-[#333950]'}`}
            >
              <input
                onChange={() => {
                  setTrackedErrors({ ...trackedErrors, phone: state.number });
                }}
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                autoComplete="tel"
              />
              <Image
                className={state.errorData.phone && trackedErrors.phone !== state.number ? 'block' : 'hidden'}
                src={iconCross as string}
                alt="cross icon"
                width={20}
                height={20}
              />
            </div>
            <div
              className={`inputDiv ${state.errorData.company && trackedErrors.company !== state.number ? 'border-[#F05B5B] text-[#F05B5B]' : 'border-[#747B95]/50 text-[#333950]'}`}
            >
              <input
                onChange={() => {
                  setTrackedErrors({ ...trackedErrors, company: state.number });
                }}
                id="company"
                name="company"
                placeholder="Company"
                type="text"
                autoComplete="organization"
              />
              <Image
                className={state.errorData.company && trackedErrors.company !== state.number ? 'block' : 'hidden'}
                src={iconCross as string}
                alt="cross icon"
                width={20}
                height={20}
              />
            </div>
            <div className="w-full">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
