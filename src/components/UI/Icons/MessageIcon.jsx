import { color } from 'framer-motion';
import { AiOutlineMessage } from 'react-icons/ai';
export default function MessageIcon({ size, color }) {
  return <AiOutlineMessage className={'sm:size-[20px]'} size={size} color={color} />;
}
