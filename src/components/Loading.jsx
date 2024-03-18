import { BeatLoader } from 'react-spinners';

export default function Loading({ isPending, isError }) {
  if (isPending)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <BeatLoader color='hotpink' />
      </div>
    );
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;
}
