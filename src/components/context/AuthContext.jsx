'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthContext = (WrappedComponent, options = {}) => {
  const { adminRequired = false } = options;

  const AuthComponent = (props) => {
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        console.log('hoc', token);
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
