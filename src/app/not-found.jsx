'use client';
import { motion } from 'framer-motion';
export default function notFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex h-screen items-center justify-center text-center text-2xl'
    >
      <div>
        <h1 className='mb-8 text-6xl'>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
      </div>
    </motion.div>
  );
}
