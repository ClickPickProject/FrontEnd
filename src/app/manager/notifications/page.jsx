export default function page() {
  return (
    <div className='mx-auto flex h-[500px] w-[512px] flex-col rounded-lg bg-white shadow-md'>
      <div className='bg-gray-200 px-6 py-4 text-lg font-semibold text-gray-800'>공지사항 작성</div>
      <div className='p-6'>
        <div className='mb-6'>
          <label className='mb-2 text-sm font-bold text-gray-700' htmlFor='title'>
            제목
          </label>
          <input
            className='focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            id='title'
            type='text'
            placeholder='제목을 입력하세요...'
          />
        </div>
        <div className='mb-6'>
          <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='notice'>
            내용
          </label>
          <textarea
            className='focus:shadow-outline w-full resize-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            placeholder='공지사항 내용을 입력하세요...'
            rows='10'
          />
        </div>
        <div className='flex justify-end'>
          <button
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            type='button'
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}
