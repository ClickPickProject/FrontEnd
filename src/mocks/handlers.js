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

  // 게시글 작성
  http.post('/api/member/post', () => {
    return HttpResponse.json({
      title: '제목',
      content: '내용',
      position: '서울 송파구 가락로 2 (석촌동)',
      hashtag: ['#아아', '#이이'],
      postCategory: '자유',
    });
  }),

  // 게시글 리스트 조회
  http.get('/api/post/list', () => {
    return HttpResponse.json({
      content: [
        {
          postId: '1',
          nickname: 'testAccount',
          title: '제목일세',
          createAt: '2024-03-01T18:55:48.884Z',
          viewCount: 30,
          likeCount: 1,
          hashtags: ['#해시태그'],
        },
        {
          postId: '2',
          nickname: '어쩌고저쩌고',
          title: '제목2',
          createAt: '2024-03-02T18:55:48.884Z',
          viewCount: 1,
          likeCount: 2,
          hashtags: ['#해시태그', '#하이'],
        },
        {
          postId: '3',
          nickname: 'isd',
          title: '제목일세',
          createAt: '2024-03-03T18:55:48.884Z',
          viewCount: 1,
          likeCount: 1,
          hashtags: ['#해시태그'],
        },
        {
          postId: '4',
          nickname: 'testAccount',
          title: '제목일세',
          createAt: '2024-03-04T18:55:48.884Z',
          viewCount: 2,
          likeCount: 2,
          hashtags: ['#해시태그'],
        },
        {
          postId: '5',
          nickname: 'testAccount',
          title: '안녕하세요',
          createAt: '2024-03-05T18:55:48.884Z',
          viewCount: 50,
          likeCount: 30,
          hashtags: ['#해시태그'],
        },
      ],
      pageable: {
        pageNumber: '0',
        pageSize: '10',
        sort: {
          empty: false,
          sorted: false,
          unsorted: false,
        },
        offset: 0,
        paged: false,
        unpaged: false,
      },
      last: false,
      totalPages: 1,
      totalElements: 10,
      first: true,
      size: 10,
      number: 0,
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      numberOfElements: 10,
      empty: false,
    });
  }),
  // 게시글 상세 조회
  http.get('/api/post/:postId', ({ params }) => {
    const { postId } = params;
    return HttpResponse.json({
      nickname: 'testAccount',
      title: 'title',
      content:
        '<p><span style="color:#e06c75;">"users"</span><span style="color:#bbbbbb;">: </span><span style="color:#abb2bf;">[</span></p><p><span style="color:#bbbbbb;">{</span></p><p><span style="color:#e06c75;">"userId"</span><span style="color:#bbbbbb;">: </span><span style="color:#98c379;">"userId"</span><span style="color:#bbbbbb;">,</span></p><p><span style="color:#e06c75;">"title"</span><span style="color:#bbbbbb;">: </span><span style="color:#98c379;">"title"</span><span style="color:#bbbbbb;">,</span></p><p><span style="color:#e06c75;">"content"</span><span style="color:#bbbbbb;">: </span><span style="color:#98c379;">"content"</span><span style="color:#bbbbbb;">,</span></p><p><span style="color:#e06c75;">"position"</span><span style="color:#bbbbbb;">: </span><span style="color:#98c379;">""</span><span style="color:#bbbbbb;">,</span></p><p><span style="color:#e06c75;">"hashtag"</span><span style="color:#bbbbbb;">: </span><span style="color:#abb2bf;">[]</span><span style="color:#bbbbbb;">,</span></p><p><span style="color:#e06c75;">"id"</span><span style="color:#bbbbbb;">: </span><span style="color:#98c379;">"0"</span><span style="color:#bbbbbb;">,</span></p><p><span style="color:#e06c75;">"date"</span><span style="color:#bbbbbb;">: </span><span style="color:#98c379;">"2024-03-01T18:42:43.406Z"</span></p><p><span style="color:#bbbbbb;">}</span></p><p><span style="color:#abb2bf;">]</span><span style="color:#bbbbbb;">,</span></p>',
      date: '2024-03-05T18:55:48.884Z',
      likeCount: 1,
      viewCount: 1,
      position: '',
      photoDate: '2024-03-05T18:55:48.884Z',
      hashtags: ['#해쉬태그', '#테스트'],
    });
  }),
];
