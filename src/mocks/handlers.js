import { HttpResponse, delay, http } from 'msw';

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
  http.post('/api/member/post', async () => {
    await delay(1000);
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

  // 게시글 이미지 추가
  http.post('/api/member/post/image', async ({ request }) => {
    const data = await request.formData();
    const image = data.get('image');
    if (!image) {
      return new HttpResponse('Missing image', { status: 400 });
    }
    return HttpResponse.json({
      url: `/Images/black.jpg`,
      capacity: 123456,
    });
  }),

  // 게시글 수정
  http.post('/api/member/post/:postId', () => {
    return HttpResponse.json({
      title: '수정된 제목',
      content: '수정된 내용',
      position: '수저된 address',
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

  // 사용자 목록
  http.get('/api/admin/userlist', () => {
    return HttpResponse.json({
      content: [
        {
          id: 'tm4839@naver.com',
          name: '김철수',
          nickname: '닉네임',
          phone: '01012345678',
          createAt: '2024-03-20T12:00:00.884Z',
          userStatus: 'NORMAL',
        },
        {
          id: 'ban@naver.com',
          name: 'name',
          nickname: 'nickname',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'NORMAL',
        },
        {
          id: 'zozispor@tiusewi.gt',
          name: 'ban',
          nickname: 'ban',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'NORMAL',
        },
        {
          id: 'to@vaneid.org',
          name: 'Craig',
          nickname: 'kind',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'NORMAL',
        },
        {
          id: 'ijpovo@lolef.cg',
          name: 'Brett',
          nickname: 'dream',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'NORMAL',
        },
        {
          id: 'kopez@cahibowo.ru',
          name: 'Elizabeth',
          nickname: 'honor',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'NORMAL',
        },
        {
          id: 'kalu@zi.us',
          name: 'Ida',
          nickname: 'discovery',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'BAN',
        },
        {
          id: 'le@inafe.tm',
          name: 'Lina',
          nickname: 'involved',
          phone: '01099998877',
          createAt: '2024-03-15T16:00:00.884Z',
          userStatus: 'BAN',
        },
      ],
    });
  }),

  // 정지된(banned) 유저 리스트
  http.get('/api/admin/banuserlist', () => {
    return HttpResponse.json({
      content: [
        {
          id: 'kalu@zi.us',
          name: 'Ida',
          nickname: 'discovery',
          phone: '01099998877',
          startDate: '2024-04-01T16:00:48.884Z',
          endDate: '2024-04-30T16:00:48.884Z',
        },
        {
          id: 'le@inafe.tm',
          name: 'Lina',
          nickname: 'involved',
          phone: '01099998877',
          startDate: '2024-04-20T16:00:48.884Z',
          endDate: '2024-04-30T16:00:48.884Z',
        },
      ],
    });
  }),

  /* Places */
  // 영역 내 게시글 조회
  http.post('/api/map/marker', () => {
    return HttpResponse.json([
      {
        postId: 90,
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        position: '스타벅스 선릉역점',
      },
      {
        postId: 91,
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        position: '스타벅스 선릉역점',
      },
      {
        postId: 92,
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        position: '스타벅스 선릉역점',
      },
      {
        postId: 93,
        xposition: 127.028443419181,
        yposition: 37.4976744709989,
        position: '스타벅스 강남R점',
      },
      {
        postId: 4901,
        xposition: 127.10297988971773,
        yposition: 37.48800665367514,
        position: '스타벅스 수서역R점',
      },
      {
        postId: 81493,
        xposition: 127.10297988971773,
        yposition: 37.48800665367514,
        position: '스타벅스 수서역R점',
      },
      {
        postId: 96593,
        xposition: 127.10297988971773,
        yposition: 37.48800665367514,
        position: '스타벅스 수서역R점',
      },
      {
        postId: 1993,
        xposition: 127.10297988971773,
        yposition: 37.48800665367514,
        position: '스타벅스 수서역R점',
      },
      {
        postId: 72293,
        xposition: 127.10297988971773,
        yposition: 37.48800665367514,
        position: '스타벅스 수서역R점',
      },
      {
        postId: 4421,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 5671,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 1641,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 3211,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 6021,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 9311,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 3781,
        xposition: 127.046872393057,
        yposition: 37.523735555011335,
        position: '스타벅스 청담사거리점',
      },
      {
        postId: 1541,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1191,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1541,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1191,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1541,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1191,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1541,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1191,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1541,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 1191,
        xposition: 127.0207677490634,
        yposition: 37.51622596162784,
        position: '스타벅스 신사역점',
      },
      {
        postId: 30,
        xposition: 127.06167034346593,
        yposition: 37.5100064732589,
        position: '스타벅스 스타필드코엑스몰 R점',
      },
      {
        postId: 40,
        xposition: 127.06167034346593,
        yposition: 37.5100064732589,
        position: '스타벅스 스타필드코엑스몰 R점',
      },
    ]);
  }),
  // 동일 좌표 게시글 리스트 조회
  http.get('/api/map/post/:xPosition/:yPosition', () => {
    return HttpResponse.json({
      content: [
        {
          postId: 1,
          nickname: '닉네임',
          title: '제목',
          createAt: '2024-04-01T16:00:48.884Z',
          viewCount: 10,
          likeCount: 10,
          hashtags: '여행',
          postCategory: '자유',
          CommentCount: '30',
          profileUrl: '/Images/forest.jpg',
        },
        {
          postId: 2,
          nickname: '닉네임',
          title: '제목',
          createAt: '2024-04-02T16:00:48.884Z',
          viewCount: 10,
          likeCount: 10,
          hashtags: '여행',
          postCategory: '자유',
          CommentCount: '30',
          profileUrl: '/Images/forest.jpg',
        },
        {
          postId: 3,
          nickname: '닉네임',
          title: '제목',
          createAt: '2024-04-03T16:00:48.884Z',
          viewCount: 10,
          likeCount: 10,
          hashtags: '여행',
          postCategory: '자유',
          CommentCount: '30',
          profileUrl: '/Images/forest.jpg',
        },
      ],
    });
  }),
  http.post('/api/member/map/bookmark', () => {
    return HttpResponse.json({
      name: '스타벅스 선릉역점',
      xposition: 1,
      yposition: 1,
      status: 'LIKE',
    });
  }),

  // 즐겨찾기 조회
  http.get('/api/member/map/bookmark/list', () => {
    return HttpResponse.json([
      {
        name: '스타벅스 선릉역점',
        category: '카페',
        address: '서울특별시 강남구 테헤란로 334',
        homepage: 'https://www.naver.com',
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        status: 'LIKE',
      },
      {
        name: '스타벅스 선릉역점',
        category: '카페',
        address: '서울특별시 강남구 테헤란로 334',
        homepage: 'https://www.naver.com',
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        status: 'LIKE',
      },
      {
        name: '스타벅스 선릉역점',
        category: '카페',
        address: '서울특별시 강남구 테헤란로 334',
        homepage: 'https://www.naver.com',
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        status: 'LIKE',
      },
      {
        name: '스타벅스 선릉역점',
        category: '카페',
        address: '서울특별시 강남구 테헤란로 334',
        homepage: 'https://www.naver.com',
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        status: 'LIKE',
      },
      {
        name: '스타벅스 선릉역점',
        category: '카페',
        address: '서울특별시 강남구 테헤란로 334',
        homepage: 'https://www.naver.com',
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        status: 'LIKE',
      },
      {
        name: '스타벅스 선릉역점',
        category: '카페',
        address: '서울특별시 강남구 테헤란로 334',
        homepage: 'https://www.naver.com',
        xposition: 127.04859034788,
        yposition: 37.5038956552172,
        status: 'LIKE',
      },
    ]);
  }),
  // 공지사항 목록 조회
  http.get('/api/notice/list', () => {
    return HttpResponse.json({
      content: [
        {
          noticeId: 1,
          nickname: '관리자',
          title: '공지사항',
          createAt: '2024-04-24T19:55:48.884Z',
        },
        {
          noticeId: 2,
          nickname: 'hall',
          title: 'Bhutan',
          createAt: '2024-04-24T20:55:48.884Z',
        },
        {
          noticeId: 3,
          nickname: 'stems',
          title: 'cap',
          createAt: '2024-04-25T19:55:48.884Z',
        },
        {
          noticeId: 4,
          nickname: 'comfortable',
          title: 'palace',
          createAt: '2024-04-25T20:55:48.884Z',
        },
        {
          noticeId: 5,
          nickname: 'beautiful',
          title: 'luck',
          createAt: '2024-04-25T20:55:48.884Z',
        },
        {
          noticeId: 6,
          nickname: 'hat',
          title: 'serious',
          createAt: '2024-04-25T21:55:48.884Z',
        },
        {
          noticeId: 7,
          nickname: 'bone',
          title: 'roar',
          createAt: '2024-04-25T22:55:48.884Z',
        },
      ],
    });
  }),
  // 공지사항 상세 조회
  http.get('/api/notice/:noticeId', ({ params }) => {
    const { noticeId } = params;
    return HttpResponse.json({
      noticeId: noticeId,
      nickname: '관리자',
      title: '공지사항',
      content: '공지사항 내용입니다.',
      createAt: '2024-04-24T19:55:48.884Z',
    });
  }),
  // 신고된 게시글 처리
  http.post('/api/admin/postban', () => {
    return HttpResponse.json('정지되었습니다.');
  }),
  // 신고된 게시글 리스트 조회
  http.get('/api/admin/reportpostlist', () => {
    return HttpResponse.json({
      content: [
        {
          reportPostId: 1,
          reportUserId: 'police@gmail.com',
          reportedUserId: 'uneducated@gmail.com',
          postId: 1,
          reason: '욕설',
          reportStatus: '처리전',
        },
        {
          reportPostId: 3,
          reportUserId: 'police4@gmail.com',
          reportedUserId: 'uneducated3@naver.com',
          postId: 3,
          reason: '비방',
          reportStatus: '처리전',
        },
        {
          reportPostId: 4,
          reportUserId: 'police5@gmail.com',
          reportedUserId: 'uneducated2@gmail.com',
          postId: 4,
          reason: '비방',
          reportStatus: '처리전',
        },
        {
          reportPostId: 2,
          reportUserId: 'police@gmail.com',
          reportedUserId: 'uneducated@gmail.com',
          postId: 2,
          reason: '욕설',
          reportStatus: '처리전',
        },
      ],
    });
  }),
  // 신고된 댓글 처리
  http.post('/api/admin/commentban', () => {
    return HttpResponse.json({
      reportCommentId: 1,
      reportedUserId: 'commentBadUser@gmail.com',
      reason: '비방',
      banDays: 7,
    });
  }),

  // 신고된 댓글 리스트 조회
  http.get('/api/admin/reportcommentlist', () => {
    return HttpResponse.json({
      content: [
        {
          reportCommentId: 1,
          reportUserId: 'police@gmail.com',
          reportedUserId: 'uneducated@gmail.com',
          commentId: 2,
          reason: '비방',
          reportStatus: '처리전',
        },
        {
          reportCommentId: 2,
          reportUserId: 'police2@naver.com',
          reportedUserId: 'uneducated2@naver.com',
          commentId: 3,
          reason: '광고',
          reportStatus: '처리완료',
        },
      ],
    });
  }),

  // 월별 사용자 수 조회
  http.get('/api/admin/user/month/:year', ({ params }) => {
    const { year } = params;
    return HttpResponse.json({
      userCount: 128,
      monthYear: year,
    });
  }),

  // 정지된 사용자 해제
  http.delete('/api/admin/ban/:userId', ({ params }) => {
    const { userId } = params;
    return HttpResponse.json(`${userId} 정지해제`);
  }),
];
