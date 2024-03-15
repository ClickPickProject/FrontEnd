/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
      },
      // 회원가입
      {
        source: '/api/signup/user',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/signup/user`,
      },
      // 중복확인
      {
        source: '/api/check/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/check/:path*`,
      },
      // 중복확인
      {
        source: '/api/verification',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/verification`,
      },

      // 게시글 목록, 베스트 게시글
      {
        source: '/api/post/list',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/post/list`,
      },

      // 글 작성
      {
        source: '/api/member/post',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/post`,
      },

      // 게시글 상세페이지
      {
        source: '/api/post/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/post/:path*`,
      },
      // 좋아요(like)
      {
        source: '/api/member/likedpost/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/likedpost/:path*`,
      },
      // 댓글 작성/수정/삭제
      {
        source: '/api/member/comment/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/comment/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
