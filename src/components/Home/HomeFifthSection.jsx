import Image from 'next/image';
import styled from './Home.module.scss';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
export default function HomeFifthSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);
  return (
    <motion.div ref={ref} className='relative grid h-screen w-full place-items-center overflow-hidden'>
      <motion.h1 style={{ y: textY }} className='relative z-10 text-7xl font-bold text-white md:text-9xl'>
        <div className='text-center'>
          아름다움이 함축된 풍경 속에서 <br /> 우리 자신을 발견하세요.
        </div>
      </motion.h1>
      <motion.figure
        className='absolute inset-0 z-0'
        style={{
          y: backgroundY,
        }}
      >
        <Image alt='#' src='/Images/nature-Milky.jpg' fill={true} className='object-cover' />
      </motion.figure>

      {/* <div
        className='absolute inset-0 z-20'
        style={{
          backgroundImage: `url(/image-bottom.png)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      /> */}
    </motion.div>
  );
}
