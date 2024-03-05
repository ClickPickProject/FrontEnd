'use client';
import PostDetail from '@/components/Community/PostDetail';
import axios from 'axios';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function PostPage() {
  const router = useRouter();
  const path = useParams();
  const onClick = async (e) => {
    try {
      const res = await axios.put('http://localhost:3001/posts/1', {
        userId: 'dewep@izibo.pmtest',
        title: 'forth',
        content: '내용변경하세요오옹',
        position: '',
        hashtag: '',
      });
      if (res.status === 200) {
        console.log('수정 완료');
        alert('수정완료');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <PostDetail />
    </>
  );
}
