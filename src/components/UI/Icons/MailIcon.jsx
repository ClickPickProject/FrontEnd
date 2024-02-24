import { MdOutlineMailOutline } from 'react-icons/md';
export default function MailIcon({ size, color }) {
  return (
    <MdOutlineMailOutline
      size={size}
      color={color}
      className='absolute ml-1 flex h-full items-center justify-center opacity-50'
    />
  );
}
