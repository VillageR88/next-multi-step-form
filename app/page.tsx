import Header from '@/app/home/Header';
import Main from '@/app/home/Main';
import Footer from './home/Footer';

export default function Home() {
  return (
    <div className="relative z-0 flex min-h-dvh flex-col items-center justify-start overflow-x-clip font-kumbhSans sm:min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
