/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // 로그인
      {
        source: '/api/login',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
      },

      // 게시글 목록, 베스트 게시글
      {
        source: '/api/post/list/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/post/list/:path*`,
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
    ];
  },
};

module.exports = nextConfig;
