import { useState } from 'react';
export default function MyProfile() {
  const [name, setName] = useState('초기 이름값');
  const [address, setAddress] = useState('초기 주소값');
  const [namechange, setNamechange] = useState(false);
  const [addresschange, setAddresschange] = useState(false);
  let resName = '';
  let resAddress = '';
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlenameValuechange = (e) => {
    e.preventDefault();
    console.log('이름이 변경됨');
    setNamechange((value) => !value);
    //이름변경 저장소
    resName = name;
    console.log(resName);
  };
  const handleAddressValuechange = (e) => {
    e.preventDefault();
    console.log('주소가 변경됨');
    setAddresschange((value) => !value);
    //주소변경 저장소
    resAddress = address;
    console.log(resAddress);
  };
  return (
    <>
      <div className='flex w-full flex-col'>
        <h1 className='mb-5 text-2xl font-bold '>🙋‍♂️마이 프로필</h1>
        <div className='mb-10 border border-pink-200'></div>
        <div className='mx-auto flex h-96 w-2/3 rounded-2xl border border-pink-200'>
          <div>
            <img src='' alt='#' />
            <form action='' onSubmit={handlenameValuechange}>
              <label htmlFor='name'>이름</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={handleNameChange}
                placeholder='이름을 입력하세요'
                disabled={!namechange}
              />
              <button>변경</button>
            </form>
            <form action='' onSubmit={handleAddressValuechange}>
              <label htmlFor='address'>사는곳</label>
              <input
                id='address'
                type='text'
                value={address}
                onChange={handleAddressChange}
                placeholder='주소를 입력하세요'
                disabled={!addresschange}
              />
              <button>변경</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
