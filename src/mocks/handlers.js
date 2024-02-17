import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/test', () => {
    return HttpResponse.json({ id: 'abc-123' });
  }),
  http.get('/api/login', (req) => {
    return HttpResponse.json(
      {
        userId: 1,
        nickname: 'elbyss',
        id: 'elbyss',
      },
      {
        headers: {
          'Set-Cookie': 'connect-id=msw-cookie;HttpOnly;Path=/',
        },
      },
    );
  }),
  http.post('/api/logout', (req) => {
    return HttpResponse.json({
      headers: {
        'Set-Cookie': 'connect-id=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
];
