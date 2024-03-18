export default function HashtagView({ tags }) {
  return (
    <>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, idx) => (
          <span key={idx} className='relative flex gap-1 rounded-md bg-pink-200 px-2'>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
