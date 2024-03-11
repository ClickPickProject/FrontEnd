'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthContext = (WrappedComponent, options = {}) => {
  const { adminRequired = false } = options;

  const AuthComponent = (props) => {
    const router = useRouter();
    const token = localStorage.getItem('id');
    const isAdmin = localStorage.getItem('admin') === 'true';

    useEffect(() => {
      if (!token) {
        console.log('토큰 없음');
        router.push('/login');
      } else if (adminRequired && !isAdmin) {
        // 관리자 권한 제어
        alert('관리자만 접근할 수 있습니다.');
        router.push('/');
      }
    }, [token, isAdmin]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AuthContext;
