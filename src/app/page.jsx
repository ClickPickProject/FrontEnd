'use client';
import { motion } from 'framer-motion';
import HomeNavbar from '@/components/Home/HomeNavbar';
import HomeFirstSection from '@/components/Home/HomeFirstSection';
import HomeSecondSection from '@/components/Home/HomeSecondSection';
import HomeThirdSection from '@/components/Home/HomeThirdSection';
export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='min-h-screen bg-[#fdf4f5]'
      >
        <HomeNavbar />
        <main>
          <HomeFirstSection />
          <HomeSecondSection />
          <HomeThirdSection />
        </main>
        <footer>
          <div></div>
        </footer>
      </motion.div>
    </>
  );
}
