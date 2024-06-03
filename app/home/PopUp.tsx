'use client';

import { DataContext } from '../_providers/DataContext';
import { useContext, useEffect, useState } from 'react';

export default function PopUp() {
  const { showMessage, selectedOption, setShowMessage } = useContext(DataContext);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  useEffect(() => {
    if (showMessage) {
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
        setShowMessage(false);
      }, 6000);
    }
  }, [setShowMessage, showMessage]);
  const popUpText = `Thanks for choosing ${selectedOption} as your product! We’ll be in touch soon!`;

  return (
    <div
      className={`${showPopUp ? '' : '-translate-y-full'} fixed inset-0 flex h-fit justify-center px-[24px] transition-transform duration-500`}
    >
      <div className="mt-[24px] flex size-full h-fit min-h-[107px] max-w-[440px] flex-col gap-[8px] rounded-[12px] bg-[#5175FF] p-[24px]">
        <div className="flex items-center gap-[8px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21">
            <path
              fill="#fff"
              d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"
            />
          </svg>
          <span className="text-[18px] font-bold leading-[150%] text-[#FFFFFF]">Message Sent!</span>
        </div>
        <span className="text-[16px] leading-[150%] text-[#E0F1E8]">{popUpText}</span>
      </div>
    </div>
  );
}
