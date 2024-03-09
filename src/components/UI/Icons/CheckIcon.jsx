import { IoIosCheckboxOutline } from 'react-icons/io';

export default function CheckIcon({ size, color }) {
  return (
    <IoIosCheckboxOutline
      size={size}
      color={color}
      className='absolute ml-1 flex h-full items-center justify-center opacity-50'
    />
  );
}
