import { postImagesState } from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function PostImageList() {
  const token = useRecoilValue(tokenState);
  const [postImages, setPostImages] = useRecoilState(postImagesState);
  const onClickImage = async (image) => {
    console.log('이미지 삭제');
    try {
      // 이미지 삭제
      const res = await axios.delete(`/api/member/post/image/${image}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        console.log('이미지 삭제 성공');
        setPostImages((prev) => prev.filter((img) => img !== image));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className='flex w-full gap-2 border-2'>
      {postImages?.map((image) => (
        <li className='relative flex h-[64px]'>
          <div className='flex h-[inherit] w-[64px]'>
            <img src={`/Images/${image}`} className='h-full w-full' />
            <div className='absolute right-0 top-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-30 text-white transition-all hover:bg-pink-400'>
              <button onClick={() => onClickImage(image)}>
                <IoClose size={20} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
