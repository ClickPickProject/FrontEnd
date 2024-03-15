export default function Loading({ isLoading, isError }) {
  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;
}
