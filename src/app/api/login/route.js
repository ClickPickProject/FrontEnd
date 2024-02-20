// app/api/login/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const res = [
    {
      user_id: '123123',
      pw: '123123',
      nickname: 'nickanme',
    },
  ];

  return NextResponse.json(res);
}

export async function POST(request) {
  const { user_email, password } = await request.json();

  const mockUsers = [
    {
      user_email: 'existing@example.com',
      password: '123',
      user_id: 'ㅁㄴㅇ',
    },
  ];

  const user = mockUsers.find((u) => u.user_email === user_email && u.password === password);

  if (!user) {
    return new Response(
      JSON.stringify({
        message: '유저 등록이 안돼있음.',
        result: null,
      }),
      {
        status: 202,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    );
  }

  return new Response(
    JSON.stringify({
      message: '로그인 성공',
      result: {
        user_id: user.user_id,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  );
}
