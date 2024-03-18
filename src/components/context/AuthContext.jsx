'use client';
import { tokenState } from '@/atoms/tokenState';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const AuthContext = (WrappedComponent, options = {}) => {
  const { adminRequired = false } = options;
  const AuthComponent = (props) => {
    const router = useRouter();
    const token = useRecoilValue(tokenState);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // const isAdmin = localStorage.getItem('admin') === 'true';
        if (!token) {
          console.log('토큰 없음');
          router.push('/login');
        } else if (adminRequired && !isAdmin) {
          // 관리자 권한 제어
          alert('관리자만 접근할 수 있습니다.');
          router.push('/');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AuthContext;
