import { RiLockPasswordLine } from 'react-icons/ri';
export default function PasswordIcon({ size, color }) {
  return (
    <RiLockPasswordLine
      size={size}
      color={color}
      className='absolute ml-1 flex h-full items-center justify-center opacity-50'
    />
  );
}
