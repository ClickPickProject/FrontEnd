import { Open_Sans } from 'next/font/google';
import './globals.css';
import MSWComponent from '@/components/Home/MSWComponent';

const open = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'ClickPick',
  description: '새로운 일상을 공유해보세요',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={open.className}>
        <MSWComponent />
        {children}
      </body>
    </html>
  );
}
