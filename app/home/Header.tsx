import Image from 'next/image';
import patternHeader from '@/public/assets/home/bg-pattern-header.svg';
import logo from '@/public/assets/shared/logo.svg';

export default function Header() {
  return (
    <header className="flex min-h-[700px] w-full max-w-[calc(1110px)] flex-col items-center px-10 md:flex-row md:items-stretch screen1200:px-0">
      <Image
        className=" mt-[81px] h-[30px] w-[155px]"
        width={155}
        height={30}
        src={logo as string}
        alt="logo"
        priority
      />
      <Image
        width={1134}
        height={1134}
        className="mt-[-340px] size-full min-w-[666px] md:ml-[293px] md:mt-[-164px] lg:ml-[337px] lg:mt-[-419px] lg:min-h-[1134px] lg:min-w-[1134px]"
        src={patternHeader as string}
        alt="background image"
      />
    </header>
  );
}
