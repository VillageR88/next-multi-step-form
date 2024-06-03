import Image from 'next/image';
import image1 from '@/public/assets/home/illustration-charts.svg';
import ButtonGetStarted from '../components/ButtonGetStarted';

export default function MainRow1() {
  return (
    <div className="flex size-full flex-col-reverse items-center justify-between gap-8 px-10 md:flex-row lg:items-start screen1200:px-0">
      <div className="flex flex-col items-center justify-between gap-[38px] text-center md:mt-[72px] md:w-[540px] md:items-start md:text-start screen1200:gap-[32px]">
        <section className="flex flex-col gap-[24px]">
          <h1 className="text-[#333950]">A simple solution to complex tasks is coming soon</h1>
          <p className="text-[#747B95]">
            Say goodbye to inefficient juggling of multiple apps, teams, and projects. Officelite is the new
            collaboration platform built with an intuitive interface to improve productivity.
          </p>
        </section>
        <ButtonGetStarted shadow />
      </div>
      <div>
        <Image
          className="h-[350px] w-fit md:size-fit lg:min-h-[531px] lg:min-w-[475px]"
          src={image1 as string}
          alt="illustration charts"
          priority
        />
      </div>
    </div>
  );
}
