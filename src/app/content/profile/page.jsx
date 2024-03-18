export default function ProfilePage() {
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent t pb-1 transition-all';
  return (
    <>
      <div className='flex w-full flex-col'>
        <ul className='mx-auto my-5 flex h-12 space-x-8 font-semibold'>
          <li className={hoverStyle}>🙋‍♂️ 마이 프로필</li>
          <li className={hoverStyle}>📋 나의 게시글</li>
          <li className={hoverStyle}>💬 나의 댓글</li>
          <li className={hoverStyle}>❤️ 좋아요한 게시글</li>
          <li className={hoverStyle}>❤️ 좋아요한 댓글</li>
        </ul>
        <h1 className='mb-5 text-2xl font-bold '>🙋‍♂️마이 프로필</h1>
        <div className='mb-10 border border-pink-200'></div>
        <div className='mx-auto flex h-96 w-2/3 rounded-2xl border border-pink-200'>
          <img src='' alt='#' />
        </div>
      </div>
    </>
  );
}
