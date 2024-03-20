import Image from 'next/image';
import styled from './Home.module.scss';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
export default function HomeTest() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const textSize = useTransform(scrollYProgress, [0, 1], ['2rem', '3rem']);
  return (
    <div className='h-dvh bg-gradient-to-b  from-pink-100 via-slate-600 to-[#0c2042]'>
      <motion.div className={`${styled.bgGradientCustom} right-0 top-1/2`} style={{ fontSize: textSize }}></motion.div>
    </div>
  );
}
