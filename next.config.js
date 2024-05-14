/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/profile/images/**',
      },
      {
        protocol: 'http',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/post/images/**',
      },
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'clickpick.iptime.org',
        port: '8080',
        pathname: '/profile/images/**',
      },
      {
        protocol: 'http',
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
      // 게시글/댓글 신고
      {
        source: '/api/member/report/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/report/:path*`,
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
      // 프로필 사진 조회
      {
        source: '/api/profile/image/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/image/:path*`,
      }, // 프로필 사진 추가/변경/삭제
      {
        source: '/api/member/profile/image/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/profile/image/:path*`,
      },
      // 게시글 사진 추가 / 조회 / 삭제
      {
        source: '/api/member/post/image/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/post/image/:path*`,
      },
      // 지도 범위 게시글 조회
      {
        source: '/api/map/marker',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/map/marker`,
      },
      // 동일 좌표 게시글 리스트 조회
      {
        source: '/api/map/post/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/map/post/:path*`,
      },
      // 장소 즐겨찾기 / 즐겨찾기 리스트 조회
      {
        source: '/api/member/map/bookmark/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/map/bookmark/:path*`,
      },
      {
        source: '/api/notice/list',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/notice/list`,
      },
      {
        source: '/api/admin/notice',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/notice`,
      },
      {
        source: '/api/admin/notice/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/notice/:path*`,
      },
      {
        source: '/api/admin/userlist',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/userlist`,
      },
      {
        source: '/api/admin/banuserlist',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/banuserlist`,
      },
      {
        source: '/api/admin/reportpostlist',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/reportpostlist`,
      },
      {
        source: '/api/admin/reportcommentlist',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/reportcommentlist`,
      },
      {
        source: '/api/admin/postban',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/postban`,
      },
      {
        source: '/api/admin/commentban',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/commentban`,
      },
      // 질문 작성
      {
        source: '/api/member/question',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/question`,
      },
      // Q&A 질문 삭제 / 수정
      {
        source: '/api/member/question/:path',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/question`,
      },
      // 답변 작성
      {
        source: '/api/admin/:path*/answer',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/:path*/answer`,
      },
      // 답변 및 추가 질문/답변 삭제 / 수정.
      {
        source: '/api/member/answer/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/answer/:path*`,
      },
      // 추가 질문/답변 작성
      {
        source: '/api/member/:path*/:path*/reanswer',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/:path*/:path*/reanswer`,
      },

      // Q&A 질문 상세 조회
      {
        source: '/api/question/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/question/:path*`,
      },
      //  질문 리스트 조회
      {
        source: '/api/question/list',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/question/list`,
      },
      // Q&A 질문 리스트 조회
      {
        source: '/api/member/question/list',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/member/question/list`,
      },
      // Q&A 상태별 질문 리스트 조회
      {
        source: '/api/question/list/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/question/list/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
