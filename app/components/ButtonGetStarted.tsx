'use client';
import Link from 'next/link';
import { Routes } from '../routes';
import { DataContext } from '../_providers/DataContext';
import { useContext } from 'react';
import { Package } from '../_lib/interfaces';

export default function ButtonGetStarted({ shadow }: { shadow?: boolean }) {
  const { setPreferredOption } = useContext(DataContext);
  return (
    <Link href={Routes.signUp}>
      <button
        onClick={() => {
          setPreferredOption(Package.Basic);
        }}
        type="button"
        className={`${shadow ? 'shadow-[0_25px_20px_-10px_rgba(63,91,194,0.25)]' : ''} h-[56px] w-[171px] bg-[#5175FF] transition-colors hover:bg-[#829CFF]`}
      >
        Get Started
      </button>
    </Link>
  );
}
