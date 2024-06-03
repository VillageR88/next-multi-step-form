import PopUp from '@/app/home/PopUp';
import MainRow1 from '@/app/home/MainRow1';
import MainRow2 from '@/app/home/MainRow2';

export default function Main() {
  return (
    <main className="mt-[-502px] flex w-full max-w-[1110px] flex-col items-center">
      <PopUp />
      <MainRow1 />
      <MainRow2 />
    </main>
  );
}
