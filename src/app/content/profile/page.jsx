export default function ProfilePage() {
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent t pb-1 transition-all';
  return (
    <>
      <div className='flex h-24 w-full flex-col'>
        <ul className='mx-auto my-5 flex items-center space-x-8 font-bold'>
          <li className={hoverStyle}>🙋‍♂️마이 프로필</li>
          <li className={hoverStyle}>📋나의 게시글</li>
          <li className={hoverStyle}>💬나의 댓글</li>
          <li className={hoverStyle}>❤️좋아요한 게시글</li>
          <li className={hoverStyle}>❤️좋아요한 댓글</li>
        </ul>
        <div className=''>hello</div>
      </div>
    </>
  );
}
