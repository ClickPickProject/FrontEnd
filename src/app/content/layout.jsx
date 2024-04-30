'use client';
import SideNavbar from '@/components/Community/SideNavbar';
import { useRecoilValue } from 'recoil';
import { pageOpacity } from '@/atoms/pageState';
import { CallIcon, LetterIcon } from '@/components/UI/Icons';
import Footer from '@/components/Home/Footer';
export default function layout({ children }) {
  return (
    <>
      <div className='mx-auto flex w-full max-w-6xl bg-white sm:flex-col'>
        <SideNavbar />
        {children}
      </div>
      <div className='mt-32'>
        <Footer />
      </div>
    </>
  );
}
