import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.json();
  return NextResponse.json(data);
}
