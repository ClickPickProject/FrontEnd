import { useState } from 'react';
import { CrossIcon } from '../UI/Icons';
import { useRecoilState } from 'recoil';
import { editorTagState } from '@/atoms/editorContentState';

export default function Hashtag() {
  const [inputTag, setInputTag] = useState('');
  const [tag, setTag] = useRecoilState(editorTagState);

  const onChangeTag = (e) => {
    setInputTag(e.target.value);
  };

  const onKeyupTag = (e) => {
    const whiteList = inputTag.replace(/[^a-zA-Z가-힣0-9]/g, '');
    const { value } = e.target;
    if (e.code === 'Enter') {
      if (!whiteList || value.trim().length === 0) {
        setInputTag('');
        return;
      }
      setTag((prevTags) => [...new Set([...prevTags, `#${whiteList}`])]);
      setInputTag('');
    }
  };

  const onClickTag = (index) => {
    setTag((prevTags) => prevTags.filter((_, idx) => idx !== index));
  };

  return (
    <div className=''>
      <h2>태그</h2>
      <div className='flex flex-col rounded-lg border p-2'>
        <div className='flex flex-wrap gap-2 '>
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
          className='py-2 outline-none transition-all'
          placeholder='태그를 입력하세요 (선택)'
          value={inputTag}
          onChange={onChangeTag}
          onKeyUp={onKeyupTag}
        />
      </div>
    </div>
  );
}
