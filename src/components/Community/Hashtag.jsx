import { useState } from 'react';
import { CrossIcon } from '../UI/Icons';

export default function Hashtag() {
  const [inputTag, setInputTag] = useState('');
  const [tag, setTag] = useState([]);

  const onChangeTag = (e) => {
    setInputTag(e.target.value);
  };

  const onKeyupTag = (e) => {
    const { value } = e.target;
    if (value.length === 0) return;
    if (e.code === 'Enter') {
      if (value.trim().length === 0) return;
      const whiteList = inputTag.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣0-9]/g, '');
      setTag((prevTags) => [...new Set([...prevTags, whiteList])]);
      setInputTag('');
    }
  };

  const onClickTag = (index) => {
    setTag((prevTags) => prevTags.filter((_, idx) => idx !== index));
  };

  return (
    <div className=''>
      <h2>태그</h2>
      <div className='flex w-full flex-col rounded-lg border p-2'>
        <div className='flex gap-2'>
          {tag.map((tag, idx) => (
            <span key={idx} className='relative flex gap-1 rounded-md bg-pink-200 px-2'>
              {tag}
              <button className='flex items-center'>
                <CrossIcon size={15} color='hotpink' onClick={() => onClickTag(idx)} />
              </button>
            </span>
          ))}
        </div>
        <input
          className='w-full py-2 outline-none transition-all'
          placeholder='태그를 입력하세요 (선택)'
          value={inputTag}
          onChange={onChangeTag}
          onKeyUp={onKeyupTag}
        />
      </div>
    </div>
  );
}
