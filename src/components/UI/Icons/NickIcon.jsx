import { SiNamecheap } from 'react-icons/si';
export default function NickIcon({ size, color }) {
  return (
    <SiNamecheap
      size={size}
      color={color}
      className='absolute ml-1 flex h-full items-center justify-center opacity-50'
    />
  );
}
