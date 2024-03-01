'use client';
import { useState } from 'react';

export default function DropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState('');

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    console.log(`${item} 선택됨`);
    setOptions(item);
    setIsOpen(false);
  };
  return (
    <>
      <div className='relative z-10 inline-block text-left'>
        <div>
          {/* 드롭다운 토글 버튼 */}
          <button
            type='button'
            className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-0 focus:ring-offset-gray-100'
            onClick={toggleDropdown}
          >
            {options ? options : '카테고리 선택'}

            {/* 드롭다운 화살표 아이콘 */}
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path fillRule='evenodd' d='M10 14l6-6H4l6 6z' clipRule='evenodd' />
            </svg>
          </button>
        </div>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className='absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
              {/* 메뉴 아이템 */}
              <button
                className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
                onClick={() => handleMenuItemClick('옵션1')}
              >
                옵션1
              </button>
              <button
                className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
                onClick={() => handleMenuItemClick('옵션2')}
              >
                옵션2
              </button>
              <button
                className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
                onClick={() => handleMenuItemClick('옵션3')}
              >
                옵션3
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
