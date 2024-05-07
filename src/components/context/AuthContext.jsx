'use client';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

const AuthContext = (WrappedComponent, options = {}) => {
  const { adminRequired = false } = options;
  const AuthComponent = (props) => {
    const MyNickname = useRecoilValue(MyNicknameState);
    const router = useRouter();
    const token = useRecoilValue(tokenState);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const isAdmin = MyNickname === 'ADMIN';
        if (!token) {
          router.push('/login');
        } else if (adminRequired && !isAdmin) {
          toast.error('관리자만 접근할 수 있습니다.');
          router.push('/');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AuthContext;
