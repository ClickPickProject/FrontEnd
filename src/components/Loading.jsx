import { BeatLoader } from 'react-spinners';

export default function Loading({ isLoading, isError }) {
  if (isLoading) return <BeatLoader />;
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;
}
