'use client';
import { motion } from 'framer-motion';
import HomeNavbar from '@/components/Home/HomeNavbar';
import HomeFirstSection from '@/components/Home/HomeFirstSection';
import HomeSecondSection from '@/components/Home/HomeSecondSection';
import HomeThirdSection from '@/components/Home/HomeThirdSection';
import HomeFourthSection from '@/components/Home/HomeFourthSection';
import { CallIcon, LetterIcon } from '@/components/UI/Icons';
import HomeTest from '@/components/Home/HomeTest';
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
          <HomeTest />
          <HomeFourthSection />

          <div className='w-full bg-[#06141D]'>
            <div className='mx-auto max-w-lg space-y-4 py-24 text-lg leading-10 text-neutral-300'>
              <p>
                국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 학교교육 및 평생교육을
                포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은 법률로 정한다. 군인은 현역을
                면한 후가 아니면 국무총리로 임명될 수 없다. 모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로
                청원할 권리를 가진다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수
                있다.
              </p>
              <p>
                국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 대통령의 임기가 만료되는 때에는 임기만료 70일 내지
                40일전에 후임자를 선거한다. 대한민국은 민주공화국이다. 대통령은 법률에서 구체적으로 범위를 정하여
                위임받은 사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 국가는 농수산물의
                수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 대법원장의
                임기는 6년으로 하며, 중임할 수 없다. 국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와
                행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다.
              </p>
            </div>
          </div>
        </main>
        <footer className='flex h-72 w-full flex-col items-center justify-center bg-pink-100'>
          <div className='mb-4 text-lg font-bold text-pink-800'>ClickPick Project</div>
          <div className='mb-2 flex items-center text-pink-700'>
            <LetterIcon className='mr-2' /> 이메일: clickpickAdmin@clickpick.kr
          </div>
          <div className='mb-4 flex items-center text-pink-700'>
            <CallIcon className='mr-2' /> 전화번호: 010-456-7890
          </div>
          <div className='text-sm text-pink-700'>&copy; 2024 ClickPick. All rights reserved.</div>
        </footer>
      </motion.div>
    </>
  );
}
