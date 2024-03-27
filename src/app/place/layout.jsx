import Script from 'next/script';

export default function PlacePage({ children }) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1a255e499c8a8f6618c80afdd0a3b017&autoload=false&libraries=services`;
  return (
    <>
      <Script defer src={KAKAO_SDK_URL} strategy='beforeInteractive' />
      {children}
    </>
  );
}
