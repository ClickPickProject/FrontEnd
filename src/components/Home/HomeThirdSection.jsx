import Image from 'next/image';
import styled from './Home.module.scss';

export default function HomeThirdSection() {
  return (
    <figure className='relative h-[500px] md:h-[300px]'>
      <Image alt='#' src='/Images/barn.jpg' fill className='object-cover' />
      <div className={`${styled.bgGradientCustom} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
        여러분이 경험한 최근 장소를 기록해보세요
      </div>
    </figure>
  );
}
