import { useState } from 'react';
export default function MyProfile() {
  const [name, setName] = useState('초기 이름값');
  const [address, setAddress] = useState('초기 주소값');
  const [bio, setBio] = useState('초기 소개값');
  const [nameChange, setNameChange] = useState(false);
  const [addressChange, setAddressChange] = useState(false);
  const [bioChange, setBioChange] = useState(false);
  //API로 받아올 값
  let resName = '';
  let resAddress = '';
  let resBio = '';
  const handleNameValueChange = (e) => {
    e.preventDefault();
    console.log('이름이 변경됨');
    setNameChange((value) => !value);
    //이름변경 저장소
    resName = name;
    console.log(resName);
  };
  const handleAddressValueChange = (e) => {
    e.preventDefault();
    console.log('주소가 변경됨');
    setAddressChange((value) => !value);
    //주소변경 저장소
    resAddress = address;
    console.log(resAddress);
  };
  const handleBioValueChange = (e) => {
    e.preventDefault();
    console.log('소개가 변경됨');
    setBioChange((value) => !value);
    //주소변경 저장소
    resBio = bio;
    console.log(resBio);
  };
  return (
    <>
      <div className='flex w-full flex-col'>
        <h1 className='mb-5 text-2xl font-bold '>🙋‍♂️마이 프로필</h1>
        <div className='mb-10 border border-pink-200'></div>

        <div className='mx-auto flex h-96 w-2/3 rounded-2xl border border-pink-200'>
          <form action='' className='margin ml-8 mt-5'>
            <img src='/sakura.jpg' alt='#' className='h-[150px] w-[150px] rounded-full' />
            <button className=' mt-2 w-[150px] rounded-lg  bg-pink-100'>📝img</button>
          </form>
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
                disabled={!nameChange}
                className='mx-2 w-[250px] disabled:bg-pink-100'
              />
              <button className='font-semibold'>변경</button>
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
                className='mx-2 w-[250px] disabled:bg-pink-100'
                onChange={(e) => setAddress(e.target.value)}
                placeholder='주소를 입력하세요'
                disabled={!addressChange}
              />
              <button className='font-semibold'>변경</button>
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
                className='mx-2 w-[250px] py-10 disabled:bg-pink-100'
                onChange={(e) => setBio(e.target.value)}
                placeholder='주소를 입력하세요'
                disabled={!bioChange}
              />
              <button className='font-semibold'>변경</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
