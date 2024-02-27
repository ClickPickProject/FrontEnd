import { IoIosPhonePortrait } from 'react-icons/io';
export default function PhoneIcon({ size, color }) {
  return (
    <IoIosPhonePortrait
      size={size}
      color={color}
      className='absolute ml-1 flex h-full items-center justify-center opacity-50'
    />
  );
}
