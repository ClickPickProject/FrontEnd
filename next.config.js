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

      // 게시글 작성
      {
        source: '/api/member/post',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/post`,
      },

      // 게시글 수정
      {
        source: '/api/member/post/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/post/:path*`,
      },

      // 게시글 상세페이지
      {
        source: '/api/post/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/post/:path*`,
      },
      // 게시글 좋아요(like)
      {
        source: '/api/member/likedpost/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/likedpost/:path*`,
      },
      // 댓글 좋아요(like)
      {
        source: '/api/member/likedcomment/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/likedcomment/:path*`,
      },
      // 댓글 작성/수정/삭제
      {
        source: '/api/member/comment/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/comment/:path*`,
      },
      // 유저 정보
      {
        source: '/api/member/userinfo',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/userinfo`,
      },
      // 답글 작성
      {
        source: '/api/member/recomment',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/recomment`,
      },
      // 댓글 신고
      {
        source: '/api/member/report/comment',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/report/comment`,
      },
      // 유저정보 확인
      {
        source: '/api/member/userinfo',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/userinfo`,
      },
      // 회원 탈퇴
      {
        source: '/api/member/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/:path*`,
      },
      // 자신이 작성한 게시글 리스트 조회
      {
        source: '/api/member/post/list/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/post/list/:path*`,
      },
      // 자신이 작성한 댓글 리스트 조회
      {
        source: '/api/member/comment/list/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/comment/list/:path*`,
      },
      // 좋아요 한 게시글 리스트 조회
      {
        source: '/api/member/liked/post/list/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/liked/post/list/:path*`,
      },
      // 좋아요 한 댓글의 게시글 리스트 조회
      {
        source: '/api/member/liked/comment/list/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/liked/comment/list/:path*`,
      },
      // 닉네임 변경
      {
        source: '/api/member/new-nickname/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/new-nickname/:path*`,
      },
      // 전화번호 변경
      {
        source: '/api/member/new-phone-number/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/new-phone-number/:path*`,
      },
      // 프로필 사진 추가/변경/삭제
      {
        source: '/api/member/profileimage/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/profileimage/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
