import { useState } from 'react';
export default function MyProfile() {
  const [name, setName] = useState('초기 이름값');
  const [address, setAddress] = useState('초기 주소값');
  const [bio, setBio] = useState('초기 소개값');
  const [nickName, setNickName] = useState('초기 별명값');
  const [phone, setPhone] = useState('초기 휴대폰값');
  //API로 받아올 값
  let resName = '';
  let resAddress = '';
  let resBio = '';
  let resNickName = '';
  let resPhone = '';
  const handleNameValueChange = (e) => {
    e.preventDefault();
    console.log('이름이 변경됨');
    //이름변경 저장소
    resName = name;
  };
  const handleAddressValueChange = (e) => {
    e.preventDefault();
    console.log('주소가 변경됨');
    //주소변경 저장소
    resAddress = address;
  };
  const handleBioValueChange = (e) => {
    e.preventDefault();
    console.log('소개가 변경됨');
    //주소변경 저장소
    resBio = bio;
  };
  const handleNickNameValueChange = (e) => {
    e.preventDefault();
    console.log('별명이 변경됨');
    //주소변경 저장소
    resNickName = nickName;
  };
  const handlePhoneValueChange = (e) => {
    e.preventDefault();
    console.log('별명이 변경됨');
    //주소변경 저장소
    resPhone = phone;
  };
  const handleSecession = (e) => {
    e.preventDefault();
    alert('정말로 탈퇴하시겠습니까?');
  };
  const handleInputImg = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className='flex w-full flex-col'>
        <h1 className='mb-5 text-2xl font-bold '>🙋‍♂️마이 프로필</h1>
        <div className='mb-10 border border-pink-200'></div>

        <div className='mx-auto flex h-96 w-2/3 rounded-2xl border border-pink-200'>
          <div className='mx-auto'>
            <form action='' className='margin ml-8 mt-5'>
              <img src='/sakura.jpg' alt='#' className='h-[150px] w-[150px] rounded-full' />
              <button onClick={handleInputImg} className=' mt-2 w-[150px] rounded-lg  border border-black bg-pink-100'>
                📝img
              </button>
            </form>
            <div className='flex flex-col'>
              <div className='mx-auto border text-center'></div>
              <p>💬게시수 {`()`}</p>
              <p>💬댓글수 {`()`}</p>
              <p>💬조회수 {`()`}</p>
              <button onClick={handleSecession} className='my-5 rounded-lg border border-black bg-pink-100'>
                회원탈퇴
              </button>
            </div>
          </div>

          <div className='mx-auto'>
            {/* 이름 */}
            <form action='' onSubmit={handleNameValueChange} className='mt-5'>
              <label htmlFor='name' className='m-5'>
                이름
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='이름을 입력하세요'
                className='mx-2 w-[250px] bg-pink-100'
              />
            </form>
            {/* 별명 */}
            <form action='' onSubmit={handleAddressValueChange} className='mt-3'>
              <label htmlFor='nickname' className='mx-5'>
                별명
              </label>
              <input
                id='nickname'
                type='text'
                value={nickName}
                className='mx-2 w-[250px] bg-pink-100'
                onChange={(e) => setNickName(e.target.value)}
                placeholder='별명을 입력하세요'
              />
            </form>
            {/* 위치 */}
            <form action='' onSubmit={handleAddressValueChange} className='mt-3'>
              <label htmlFor='address' className='mx-5'>
                위치
              </label>
              <input
                id='address'
                type='text'
                value={address}
                className='mx-2 w-[250px] bg-pink-100'
                onChange={(e) => setAddress(e.target.value)}
                placeholder='주소를 입력하세요'
              />
            </form>
            {/* 폰번호 */}
            <form action='' onSubmit={handleBioValueChange} className='mt-3'>
              <label htmlFor='phone' className='mx-5'>
                번호
              </label>
              <input
                id='phone'
                type='tel'
                value={phone}
                className='mx-2 w-[250px] bg-pink-100'
                onChange={(e) => setPhone(e.target.value)}
                placeholder='휴대폰 번호를 입력하세요'
              />
            </form>
            {/* 소개 */}
            <form action='' onSubmit={handleBioValueChange} className='mt-3'>
              <label htmlFor='address' className='mx-5'>
                소개
              </label>
              <input
                id='address'
                type='text'
                value={bio}
                className='mx-2 w-[250px] bg-pink-100 py-10'
                onChange={(e) => setBio(e.target.value)}
                placeholder='소개를 입력하세요'
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
