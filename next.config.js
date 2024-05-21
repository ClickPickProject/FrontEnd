/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/profile/images/**',
      },
      {
        protocol: 'https',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/post/images/**',
      },
      {
        protocol: 'https',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/profile/images/**',
      },
      {
        protocol: 'https',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/post/images/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // 로그인
      {
        source: '/api/login',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
      },
      // refresh token
      {
        source: '/api/reissue',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reissue`,
      },
      // 회원가입
      {
        source: '/api/signup/user',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/signup/user`,
      },
      // 중복확인
      {
        source: '/api/check/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/check/:path*`,
      },
      // 중복확인
      {
        source: '/api/verification',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/verification`,
      },
      // 게시글 상세페이지
      {
        source: '/api/post/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/post/:path*`,
      },
      {
        source: '/api/member/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/:path*`,
      },
      // 프로필 사진 조회
      {
        source: '/api/profile/image/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/image/:path*`,
      },

      // 지도 범위 게시글 조회
      {
        source: '/api/map/marker',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/map/marker`,
      },
      // 동일 좌표 게시글 리스트 조회
      {
        source: '/api/map/post/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/map/post/:path*`,
      },
      {
        source: '/api/notice/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/notice/:path*`,
      },
      {
        source: '/api/admin/withdrawal',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/withdrawal`,
      },
      {
        source: '/api/admin/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/:path*`,
      },

      // 정지 기간 변경, 해제
      {
        source: '/api/admin/ban/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/ban/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
