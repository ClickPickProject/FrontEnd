import Image from 'next/image';
import styled from './Home.module.scss';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
export default function HomeFourthSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['-120%', '250%']);
  const textSize = useTransform(scrollYProgress, [0, 1], ['65px', '9px']);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <motion.div ref={ref} className='relative grid h-dvh w-full place-items-center overflow-hidden'>
      <motion.h1
        style={{ y: textY, fontSize: textSize, opacity: opacityProgress }}
        className={`${styled.bgGradientCustom} relative z-10 text-center text-6xl font-bold text-white md:text-9xl`}
      >
        아름다움이 함축되어 있는 클릭픽에서 <br /> 삶을 더 풍요롭게 만들어보세요.
      </motion.h1>

      <motion.figure
        className='absolute inset-0 z-0'
        style={{
          y: backgroundY,
        }}
      >
        <Image alt='#' src={'/Images/image-full.png'} fill={true} className='object-cover' />
      </motion.figure>

      <div className='absolute inset-0 z-20'>
        <Image alt='#' src={'/Images/image-bottom.png'} fill={true} className='object-cover' />
      </div>
    </motion.div>
  );
}
