'use client';
import {
  editorContentState,
  editorTagState,
  editorTitleState,
  mapAddressState,
  mapModalState,
} from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import Hashtag from '@/components/Community/Hashtag';
import CustomEditor from '@/components/CustomEditor';
import MapSearch from '@/components/Map/MapSearch';
import DropDownMenu from '@/components/UI/DropDownMenu';
import AuthContext from '@/components/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

function WritePage() {
  const [title, setTitle] = useRecoilState(editorTitleState);
  const [category, setCategory] = useState('');
  const [position, setPosition] = useState('');
  const [mapModal, setMapModal] = useRecoilState(mapModalState);
  const content = useRecoilValue(editorContentState);
  const tag = useRecoilValue(editorTagState);
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const [mapAddress, setMapAddress] = useRecoilState(mapAddressState);
  useEffect(() => {
    setTitle('');
    setMapAddress('');
  }, [setTitle]);
  const onClickWriteSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0 || category === '') {
      alert('제목 또는 내용, 카테고리가 존재하지 않습니다.');
      return;
    }
    try {
      const body = {
        title,
        content,
        position,
        hashtags: tag,
        postCategory: category,
      };
      const res = await axios.post(`/api/member/post`, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200 || 201) {
        alert('게시글이 등록되었습니다.');
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuClick = (item) => {
    setCategory(item);
  };

  const handlePostCodeClick = (address) => {
    setPosition(address);
  };
  return (
    <>
      <div>
        <div className='p-4 text-2xl font-bold'>글 작성</div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-around gap-3'>
            <DropDownMenu onChange={handleMenuClick} />
            {/* <Postcode onChange={handlePostCodeClick} /> */}
            <div className='flex w-full flex-1 justify-center gap-2 rounded-lg transition-all'>
              <input
                disabled
                className='h-full w-full rounded-lg border pl-2 text-sm outline-none'
                placeholder='장소를 입력하세요'
                value={mapAddress}
              />
              <button
                onClick={() => setMapModal(true)}
                className='flex w-16 items-center justify-center rounded-lg bg-pink-300 text-sm shadow-md transition-all hover:bg-pink-400 hover:text-white'
              >
                검색
              </button>
            </div>

            {mapModal && (
              <>
                <div
                  className={`fixed inset-0 z-50 flex items-center justify-center ${mapModal && 'bg-black bg-opacity-50'}`}
                >
                  <div className='rounded-lg border-2 border-pink-300 bg-white'>
                    <MapSearch />
                  </div>
                </div>
              </>
            )}
          </div>

          <input
            placeholder='제목을 입력하세요'
            className='h-12 rounded-lg border pl-2 text-xl outline-none'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {/* 에디터 */}
          <div className='h-[full] w-[full]'>
            <CustomEditor />
          </div>
          {/* 해시태그 */}
          <Hashtag />
          <div className='mx-auto mt-4 flex h-10 w-1/6 cursor-pointer items-center justify-center rounded-lg bg-pink-300 font-semibold shadow-md transition-all hover:bg-pink-400'>
            <button onClick={onClickWriteSubmit} className='h-full w-full'>
              제출
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthContext(WritePage, { adminRequired: false });
