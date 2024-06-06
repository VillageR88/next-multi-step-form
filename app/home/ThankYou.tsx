'use client';
import { useContext } from 'react';
import { DataContext } from '@/app/_providers/DataContext';
import Image from 'next/image';
import imageThankYou from '@/public/assets/images/icon-thank-you.svg';

export default function ThankYou() {
  const { refThankYou } = useContext(DataContext);
  const items = {
    title: 'Thank you!',
    description:
      'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at responseserver1@gmail.com.',
  };
  return (
    <div ref={refThankYou} className="hidden size-full flex-col items-center justify-center text-center">
      <Image width={80} height={80} className="size-[80px]" src={imageThankYou as string} alt="Thank you" />
      <h1 className="mt-[32px]">{items.title}</h1>
      <p className="mt-[14px] text-[16px] leading-[25px]">{items.description}</p>
    </div>
  );
}
