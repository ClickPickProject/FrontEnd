import HomeNavbar from '@/components/Home/HomeNavbar';
import HomeFirstSection from '@/components/Home/HomeFirstSection';
import HomeSecondSection from '@/components/Home/HomeSecondSection';
import Footer from '@/components/Home/Footer';
import HomeThirdSection from '@/components/Home/HomeThirdSection';

export default function Home() {
  return (
    <>
      <div className='min-h-screen bg-[#fdf4f5]'>
        <HomeNavbar />
        <main>
          <HomeFirstSection />
          <HomeSecondSection />
          <HomeThirdSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
