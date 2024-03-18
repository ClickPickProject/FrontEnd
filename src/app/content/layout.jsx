import SideNavbar from '@/components/Community/SideNavbar';

export default function layout({ children }) {
  // h-[100dvh]
  return (
    <div className='mx-auto flex max-w-7xl bg-white'>
      <SideNavbar />
      {children}
    </div>
  );
}
