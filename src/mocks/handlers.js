import { HttpResponse, http } from 'msw';

export const handlers = [
  // 이메일 중복 확인
  http.get('/api/check/userid/:userId', ({ params }) => {
    const { userId } = params;
    return HttpResponse.json({
      user_id: userId,
    });
  }),

  // 이메일 인증 확인
  http.post('/api/verification', () => {
    return HttpResponse.json('인증에 성공하였습니다.');
    // return HttpResponse.json(null, {
    //   status: 400,
    // });
  }),

  // 닉네임 중복 체크
  http.get('/api/check/nickname/:nickname', ({ params }) => {
    const { nickname } = params;
    return HttpResponse.json({
      nickname,
    });
  }),

  // 전화번호 중복 체크
  http.get('/api/check/phone/:phone', ({ params }) => {
    const { phone } = params;
    return HttpResponse.json({
      phone,
    });
  }),

  // 회원가입
  http.post('/api/signup/user', () => {
    return HttpResponse.json('회원으로 가입되었습니다.');
  }),

  // 로그인
  http.post('/api/login', () => {
    return HttpResponse.json(
      { nickname: '야놀자' },
      {
        headers: {
          Authorization: `Bearer ${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`,
        },
      },
    );
  }),

  // 유저 정보 확인
  http.get('/api/member/userinfo', () => {
    return HttpResponse.json({
      id: 'testAccount',
      name: '크아아앙',
      nickname: '야놀자',
      phone: '010-1234-5678',
      createAt: '2024-03-05T18:55:48.884Z',
    });
  }),

  // 게시글 작성
  http.post('/api/member/post', () => {
    return HttpResponse.json({
      title: '제목',
      content: '내용',
      position: '서울 송파구 가락로 2 (석촌동)',
      hashtags: ['#아아', '#이이'],
      postCategory: '자유',
      thumbnailImage: '/Images/cloud.jpg',
      imageNames: ['cloud.jpg', 'barn.jpg'],
    });
  }),

  // 게시글 삭제
  http.delete('/api/member/post/:postId', ({ params }) => {
    const { postId } = params;
    return HttpResponse.json(`${postId} 삭제가 완료되었습니다.`);
  }),

  // 게시글 수정
  http.post('/api/member/post/:postId', () => {
    return HttpResponse.json({
      title: '수정된 제목',
      content: '수정된 내용',
      position: '수저된 주소',
      hashtags: ['#수정된태그'],
      postCategory: '자유',
      thumbnailImage: '/Images/cloud.jpg',
      updateImageNames: ['cloud.jpg', 'barn.jpg'],
    });
  }),

  // 게시글 리스트 조회
  http.get('/api/post/list', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size');
    return HttpResponse.json({
      content: [
        {
          postId: 1,
          nickname: '테스트계정',
          title: '제목일세',
          createAt: '2024-03-01T18:55:48.884Z',
          viewCount: 30,
          likeCount: 1,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '/Images/barn.jpg',
        },
        {
          postId: 2,
          nickname: '어쩌고저쩌고',
          title: '제목2',
          createAt: '2024-03-02T18:55:48.884Z',
          viewCount: 1,
          likeCount: 2,
          hashtags: ['#해시태그', '#하이'],
          postCategory: '음식',
          commentCount: 300,
          profileUrl: '/Images/cloud.jpg',
        },
        {
          postId: 3,
          nickname: '거북이',
          title: '제목일세',
          createAt: '2024-03-03T18:55:48.884Z',
          viewCount: 1,
          likeCount: 1,
          hashtags: ['#해시태그'],
          postCategory: '여행지',
          commentCount: 10,
          profileUrl: '/Images/nature-Milky.jpg',
        },
        {
          postId: 4,
          nickname: '토끼',
          title: '제목일세',
          createAt: '2024-03-04T18:55:48.884Z',
          viewCount: 2,
          likeCount: 2,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '/Images/barn.jpg',
        },
        {
          postId: 5,
          nickname: '강아지',
          title: '안녕하세요',
          createAt: '2024-03-05T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '/Images/forest.jpg',
        },
        {
          postId: 6,
          nickname: '오리',
          title: '안녕하세요',
          createAt: '2024-03-06T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '/Images/dawn.jpg',
        },
        {
          postId: 7,
          nickname: '고양이',
          title: '안녕하세요',
          createAt: '2024-03-07T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '/Images/barn.jpg',
        },
        {
          postId: 8,
          nickname: '앵무새',
          title: '안녕하세요',
          createAt: '2024-03-08T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '',
        },
        {
          postId: 9,
          nickname: '김치',
          title: '안녕하세요',
          createAt: '2024-03-09T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '',
        },
        {
          postId: 10,
          nickname: '된장',
          title: '안녕하세요',
          createAt: '2024-03-10T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '자유',
          commentCount: 30,
          profileUrl: '',
        },
        {
          postId: 11,
          nickname: '인절미',
          title: '2페',
          createAt: '2024-03-11T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
          postCategory: '여행지',
          commentCount: 30,
          profileUrl: '',
        },
      ],
    });
  }),

  // 게시글 제목 검색
  http.get('/api/post/title', ({ request }) => {
    const url = new URL(request.url);
    const title = url.searchParams.get('title');
    return HttpResponse.json({
      content: [
        {
          postId: 1004,
          nickname: '제목검색',
          title: title,
          createAt: '2024-03-14T18:55:48.884Z',
          photoDate: '2024-03-14T18:55:48.884Z',
          hashtags: ['#해쉬태그', '#검색'],
          postCategory: '음식',
          commentCount: 1004,
          profileUrl: '/Images/cloud.jpg',
        },
      ],
    });
  }),
  // 게시글 내용 검색
  http.get('/api/post/content', ({ request }) => {
    const url = new URL(request.url);
    const content = url.searchParams.get('content');
    return HttpResponse.json({
      content: [
        {
          postId: 10210,
          nickname: '내용검색',
          title: '내용검색',
          createAt: '2024-03-14T18:55:48.884Z',
          photoDate: '2024-03-14T18:55:48.884Z',
          hashtags: ['#해쉬태그', '#검색'],
          postCategory: '음식',
          commentCount: 1,
          profileUrl: '/Images/black.jpg',
        },
      ],
    });
  }),
  // 게시글 태그 검색
  http.get('/api/post/hashtag', ({ request }) => {
    const url = new URL(request.url);
    const hashtag = url.searchParams.get('hashtag');
    return HttpResponse.json({
      content: [
        {
          postId: 999,
          nickname: '태그검색',
          title: '태그검색',
          createAt: '2024-03-14T18:55:48.884Z',
          photoDate: '2024-03-14T18:55:48.884Z',
          hashtags: hashtag,
          postCategory: '음식',
          commentCount: 104,
          profileUrl: '/Images/barn.jpg',
        },
      ],
    });
  }),

  // 게시글 상세 조회
  http.get('/api/post/:postId', ({ params }) => {
    const { postId } = params;
    return HttpResponse.json(
      {
        postId: postId,
        nickname: 'testAccount',
        title: 'title',
        content: '내용 테스트 중입니다.',
        likeCount: 1,
        viewCount: 1,
        position: '',
        photoDate: '2024-03-05T18:55:48.884Z',
        hashtags: ['#해쉬태그', '#테스트'],
        postCategory: '자유',
        commentCount: 3,
        likePostCheck: false,
        profileUrl: '/Images/iphone.png',
        comments: [
          {
            commentId: 1,
            nickname: '야놀자',
            content: '이게 맞나요',
            createAt: '2024-03-06T18:55:48.884Z',
            likeCount: 1,
            likeCommentCheck: false,
            commentStatus: 'LIVE',
            profileUrl: '/Images/barn.jpg',
            recommentList: [
              {
                commentId: 2,
                nickname: '기사일세',
                content: '@야놀자 탑승',
                createAt: '2024-03-086T10:55:48.884Z',
                likeCount: 13,
                likeCommentCheck: false,
                profileUrl: '/Images/barn.jpg',
                parentId: 1,
              },
            ],
          },
          {
            commentId: 3,
            nickname: '응맞음',
            content: '네네',
            createAt: '2024-03-07T18:55:48.884Z',
            likeCount: 3,
            likeCommentCheck: true,
            commentStatus: 'LIVE',
            recommentList: [
              {
                commentId: 4,
                nickname: '대대대댓',
                content: '@응맞음 대래대래댓댓 댓걸',
                createAt: '2024-03-166T10:55:48.884Z',
                likeCount: 123,
                likeCommentCheck: false,
                profileUrl: '/Images/cloud.jpg',
                parentId: 3,
              },
              {
                commentId: 5,
                nickname: '아아악',
                content: '@대대대댓 2빠',
                createAt: '2024-03-166T11:55:48.884Z',
                likeCount: 123,
                likeCommentCheck: false,
                profileUrl: '/Images/black.jpg',
                parentId: 3,
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
      },
    );
  }),

  // 베스트 게시글 리스트 조회
  http.get('/api/post/list/best', () => {
    return HttpResponse.json([
      {
        postId: 111,
        nickname: '김추천',
        title: '벚꽃임',
        createAt: '2024-03-10T18:55:48.884Z',
        viewCount: 382,
        likeCount: 300,
        hashtags: ['#봄'],
        postCategory: '여행지',
        commentCount: 1024,
        profileUrl: '/Images/barn.jpg',
        thumbnail: '/Images/forest.jpg',
      },
      {
        postId: 222,
        nickname: '이추천',
        title: '숨은 맛집 ㅊㅊ',
        createAt: '2024-03-11T12:55:48.884Z',
        viewCount: 200,
        likeCount: 200,
        hashtags: [],
        postCategory: '음식',
        commentCount: 98,
        profileUrl: '/Images/black.jpg',
        thumbnail: '/Images/cloud.jpg',
      },
      {
        postId: 333,
        nickname: 'recommend',
        title: '추천좀',
        createAt: '2024-03-11T16:00:48.884Z',
        viewCount: 126,
        likeCount: 102,
        hashtags: ['#추천', '#감사'],
        postCategory: '자유',
        commentCount: 24,
        profileUrl: '/Images/clickpick_icon.png',
        thumbnail: '/Images/dawn.jpg',
      },
    ]);
  }),

  // 게시글 좋아요(like)
  http.get('/api/member/likedpost/:postId', ({ params }) => {
    const { postId } = params;
    return HttpResponse.json(`${postId} 좋아요 클릭`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });
  }),

  /* Comments */
  // 댓글 작성
  http.post('/api/member/comment', () => {
    return HttpResponse.json({
      postId: 1,
      content: '댓글 작성입니다',
    });
  }),

  // 댓글 삭제
  http.delete('/api/member/comment/:commentId', ({ params }) => {
    const { commentId } = params;
    return HttpResponse.json(`${commentId} 삭제가 완료되었습니다.`);
  }),

  // 댓글 좋아요(like)
  http.get('/api/member/likedcomment/:commentId', ({ params }) => {
    const { commentId } = params;
    return HttpResponse.json(`${commentId} 좋아요 클릭`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });
  }),

  // 답글 작성
  http.post('/api/member/recomment', () => {
    return HttpResponse.json({
      parentcommentId: 1,
      postId: 1,
      content: '답글 작성',
    });
  }),
  // 댓글 신고
  http.post('/api/member/report/comment', () => {
    return HttpResponse.json({
      reportedUserNickname: '신고하고자 하는 댓글 닉',
      commentId: 666,
      reason: '신고 사유',
    });
  }),

  /* Admin */
  // 공지사항 작성
  http.post('/api/admin/notice', () => {
    return HttpResponse.json('공지사항이 등록되었습니다.');
  }),

  // 공지사항 수정
  http.post('/api/admin/notice/:noticeId', ({ params }) => {
    const { noticeId } = params;
    return HttpResponse.json(`${noticeId} 공지사항이 수정되었습니다.`);
  }),

  // 공지사항 삭제
  http.delete('/api/admin/notice/:noticeId', ({ params }) => {
    const { noticeId } = params;
    return HttpResponse.json(`${noticeId} 공지사항 삭제 완료`);
  }),
];
