import { Open_Sans } from 'next/font/google';
import './globals.css';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import { MSWComponent } from '@/mocks/MSWComponent';
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider';

const open = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'ClickPick',
  description: '새로운 일상을 공유해보세요',
  icons: {
    icon: 'Images/clickpick_icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={open.className}>
        <ReactQueryClientProvider>
          <RecoilRootWrapper>
            <MSWComponent>{children}</MSWComponent>
          </RecoilRootWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
