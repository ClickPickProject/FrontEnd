import SideNavbar from '@/components/Community/SideNavbar';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';

export default function layout({ children }) {
  return (
    <>
      <div className='mx-auto flex w-full max-w-6xl bg-white'>
        <SideNavbar />
        {children}
      </div>
      <footer className='mt-12 flex h-72 w-full flex-col items-center justify-center bg-pink-100'>
        <div className='mb-4 text-lg font-bold text-pink-800'>ClickPick Project</div>
        <div className='mb-2 flex items-center text-pink-700'>
          <FaEnvelope className='mr-2' /> 이메일: clickpickAdmin@clickpick.kr
        </div>
        <div className='mb-4 flex items-center text-pink-700'>
          <FaPhone className='mr-2' /> 전화번호: 010-456-7890
        </div>
        <div className='text-sm text-pink-700'>&copy; 2024 ClickPick. All rights reserved.</div>
      </footer>
    </>
  );
}
