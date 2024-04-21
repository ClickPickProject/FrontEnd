import Image from 'next/image';

export default function HomeThirdSection() {
  return (
    <div className='flex w-full items-center justify-around bg-[#06141D] sm:flex-col sm:justify-end sm:pt-8'>
      <div>
        <figure className='rounded-xl sm:w-72'>
          <Image src='/Images/introducemap.png' width={500} height={500} alt='#' className='rounded-xl object-cover' />
        </figure>
      </div>
      <div className='max-w-xl py-72 text-xl leading-10 text-neutral-300 sm:p-12 sm:text-sm'>
        <p>클릭픽 프로젝트는 다양한 맛집, 명소, 문화적인 장소 등을 발견하고 공유하는 공간입니다.</p>
        <p>
          지도와 함께 시각적인 정보를 제공하며 커뮤니티에서 다양한 의견을 나누어 서로의 경험을 더욱 풍부하게 공유가
          가능합니다.
        </p>
        <p>이를 통해 다른 사용자들은 여러 장소를 계획할 때 유용한 정보를 얻을 수 있습니다.</p>
      </div>
    </div>
  );
}
