'use client';
import {
  editorContentState,
  editorTagState,
  editorTitleState,
  mapAddressState,
  mapModalState,
  mapPositionState,
  postImagesState,
} from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import Hashtag from '@/components/Community/Hashtag';
import PostImageList from '@/components/Community/PostImageList';
import CustomEditor from '@/components/CustomEditor';
import MapWriteSearch from '@/components/Map/MapWriteSearch';
import DropDownMenu from '@/components/UI/DropDownMenu';
import AuthContext from '@/components/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/components/utils/Axios';

function WritePage() {
  const [title, setTitle] = useRecoilState(editorTitleState);
  const [category, setCategory] = useState('');
  const [position, setPosition] = useState('');
  const [mapModal, setMapModal] = useRecoilState(mapModalState);
  const content = useRecoilValue(editorContentState);
  const tag = useRecoilValue(editorTagState);
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const postImages = useRecoilValue(postImagesState);
  const [mapAddress, setMapAddress] = useRecoilState(mapAddressState);
  const [mapPosition, setMapPosition] = useRecoilState(mapPositionState);
  useEffect(() => {
    setTitle('');
    setMapAddress('');
  }, [setTitle]);
  const onClickWriteSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0 || category === '') {
      toast.error('제목 또는 내용, 카테고리가 존재하지 않습니다.', {
        position: 'top-right',
      });
      return;
    }
    const body = {
      title,
      content,
      position: mapAddress, // 장소명
      xposition: mapPosition.lng, // 경도
      yposition: mapPosition.lat, // 위도
      hashtags: tag,
      postCategory: category,
      imageNames: postImages,
    };
    const fetch = async () => {
      const res = await axiosInstance.post(`/api/member/post`, body);
      return res;
    };
    const res = await toast.promise(fetch, {
      pending: '등록중...',
      success: '게시글이 등록되었습니다.',
      error: '게시글을 등록할 수 없습니다.',
    });
    if (res.status === 200 || 201) {
      router.back();
    }
  };

  const handleMenuClick = (item) => {
    setCategory(item);
  };

  return (
    <>
      <div>
        <div className='p-4 text-2xl font-bold'>글 작성</div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-around gap-3'>
            <DropDownMenu onChange={handleMenuClick} />
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
                    <MapWriteSearch />
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
          <PostImageList postImages={postImages} />

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
