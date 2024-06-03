'use client';
import Link from 'next/link';
import { Routes } from '../routes';
import { DataContext } from '../_providers/DataContext';
import { useContext } from 'react';
import { Package } from '../_lib/interfaces';

const itemList = [
  {
    title: 'Basic',
    paragraph1: 'Free',
    paragraph2: 'Up to 5 users for free',
    paragraph3: 'Basic document collaboration',
    paragraph4: '2 GB storage',
    paragraph5: 'Great security and support',
    text1Color: 'text-[#333950]',
    text2Color: 'text-[#747B95]',
    backgroundColor: 'bg-[#FFFFFF]',
    backgroundImage: undefined,
    buttonTextColor: 'text-[#5175FF]',
    buttonBackgroundColor: 'bg-[#5175FF]/15 hover:bg-[#5175FF]/25',
    text: 'Try for Free',
    preferredValue: Package.Basic,
  },
  {
    title: 'Pro',
    paragraph1: '$9.99',
    paragraph2: 'Per user, billed monthly',
    paragraph3: 'All essential integrations',
    paragraph4: '50 GB storage',
    paragraph5: 'More control and insights',
    text1Color: 'text-[#FFFFFF]',
    text2Color: 'text-[#FFFFFF]/75',
    backgroundColor: 'bg-[#5175FF]',
    backgroundImage: "bg-[url('../public/assets/home/bg-pattern-pricing.svg')]",
    buttonTextColor: 'text-[#5175FF] hover:text-[#829CFF]',
    buttonBackgroundColor: 'bg-[#FFFFFF]',
    text: 'Now only $4.99 !',
    preferredValue: Package.Pro,
  },
  {
    title: 'Ultimate',
    paragraph1: '$19.99',
    paragraph2: 'Per user, billed monthly',
    paragraph3: 'Robust work management',
    paragraph4: '100 GB storage',
    paragraph5: 'VIP support',
    text1Color: 'text-[#333950]',
    text2Color: 'text-[#747B95]',
    backgroundColor: 'bg-[#FFFFFF]',
    backgroundImage: undefined,
    buttonTextColor: 'text-[#5175FF]',
    buttonBackgroundColor: 'bg-[#5175FF]/15 hover:bg-[#5175FF]/25',
    text: 'Now only $9.99 !',
    preferredValue: Package.Ultimate,
  },
];
const MiddleBox = ({
  title,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
  paragraph5,
  text1Color,
  text2Color,
  backgroundColor,
  backgroundImage,
  buttonTextColor,
  buttonBackgroundColor,
  text,
  preferredValue,
}: {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  paragraph5: string;
  text1Color: string;
  text2Color: string;
  backgroundColor: string;
  backgroundImage?: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  text: string;
  preferredValue: Package;
}) => {
  const { setPreferredOption } = useContext(DataContext);

  return (
    <li
      className={`${[backgroundColor, backgroundImage].map((item) => item).join(' ')} flex flex-col items-center rounded-[13px] bg-[50%_102%] bg-no-repeat px-[48px] py-[40px] text-center md:items-start md:bg-[-320px_50%] lg:h-[508px] lg:w-[350px] lg:items-center lg:bg-[50%_102%] lg:px-0`}
    >
      <div className="flex w-full flex-col items-center justify-between self-center md:flex-row lg:flex-col">
        <div className="flex flex-col items-center md:items-start lg:items-center">
          <h2 className={text1Color}>{title}</h2>
          <p className={`${text1Color} p1 mt-[40px]`}>{paragraph1}</p>
          <p className={`${text1Color} p2 mt-[8px]`}>{paragraph2}</p>
        </div>
        <div className="flex flex-col items-center self-center md:items-start lg:items-center">
          <p className={`${text2Color} p2 mt-[56px]`}>{paragraph3}</p>
          <p className={`${text2Color} p2 mt-[16px]`}>{paragraph4}</p>
          <p className={`${text2Color} p2 mt-[16px]`}>{paragraph5}</p>{' '}
        </div>
      </div>
      <Link href={Routes.signUp}>
        <button
          onClick={() => {
            setPreferredOption(preferredValue);
          }}
          type="button"
          className={`${[buttonBackgroundColor, buttonTextColor].map((item) => item).join(' ')} mt-[32px] h-[56px] w-[171px] transition-colors`}
        >
          {text}
        </button>
      </Link>
    </li>
  );
};
export default function MainRow2() {
  return (
    <div className="mt-[109px] w-full max-w-[1110px] px-10 screen1200:px-0">
      <ul className="flex flex-col justify-center gap-[30px] lg:flex-row">
        {itemList.map((item, index) => {
          return (
            <MiddleBox
              key={index}
              title={item.title}
              paragraph1={item.paragraph1}
              paragraph2={item.paragraph2}
              paragraph3={item.paragraph3}
              paragraph4={item.paragraph4}
              paragraph5={item.paragraph5}
              text1Color={item.text1Color}
              text2Color={item.text2Color}
              backgroundColor={item.backgroundColor}
              backgroundImage={item.backgroundImage}
              buttonTextColor={item.buttonTextColor}
              buttonBackgroundColor={item.buttonBackgroundColor}
              text={item.text}
              preferredValue={item.preferredValue}
            />
          );
        })}
      </ul>
    </div>
  );
}
