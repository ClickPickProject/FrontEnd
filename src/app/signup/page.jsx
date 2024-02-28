'use client';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailIcon, NickIcon, PasswordIcon, PhoneIcon, UserNameIcon } from '@/components/UI/Icons';
import InputWithValidation from '@/components/InputWithValidation';
export default function SignUpPage() {
  const [userData, setUserData] = useState({
    id: '',
    pw: '',
    confirmPw: '',
    name: '',
    nickname: '',
    phone: '',
  });
  const [inputStatus, setInputStatus] = useState({
    id: { valid: false, disabled: true },
    pw: { valid: false },
    confirmPw: { valid: false },
    name: { valid: false },
    nickname: { valid: false, disabled: true },
    phone: { valid: false, disabled: true },
  });

  // 각 입력 필드의 유효성 검사 정규식
  const validationRegex = {
    id: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    name: /^[가-힣]{2,5}$/,
    nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
    phone: /^010(\d{3,4})(\d{4})$/,
  };

  // 각 입력 필드 상태 관리 함수
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUserData({ ...userData, [field]: value });
    if (field !== 'confirmPw') {
      // confirmPw는 정규식 검사를 수행하지 않음
      const isValid = validationRegex[field].test(value);
      setInputStatus({
        ...inputStatus,
        [field]: { valid: isValid, disabled: !isValid },
      });
    }
  };

  // 중복 확인 함수
  const handleDuplicateCheck = async (field) => {
    const fieldValue = userData[field];
    const disabled = inputStatus[field].disabled;
    if (disabled) return;
    try {
      const res = await axios.get(`/api/check/${field}/${fieldValue}`);
      if (res.status === 200) {
        setInputStatus({
          ...inputStatus,
          [field]: { ...inputStatus[field], valid: true },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 모든 입력 필드가 유효한지 확인하는 함수
  const isFormValid = () => {
    return Object.values(inputStatus).every((field) => field.valid);
  };

  // 회원가입 처리 함수
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await axios.post(
        `/api/signup/user`,
        { id, password: pw, name, nickname, phone },
        { withCredentials: true },
      );
      if (res.status === 200) {
        alert('회원가입이 완료되었습니다.');
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      alert('회원가입 불가');
    }
  };

  const { id, pw, confirmPw, nickname, name, phone } = userData;
  const router = useRouter();
  const userDataFields = {
    id,
    pw,
    confirmPw,
    name,
    nickname,
    phone,
  };
  const onVisible = {};
  for (const key in userDataFields) {
    onVisible[key] = userDataFields[key].length === 0 ? 'invisible' : 'visible';
  }

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[780px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-pink-200  shadow-[1px_1px_200px_1px]  shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Link href='/'>
              <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
            </Link>
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 회원가입</h2>
          <form onSubmit={handleRegister} className='flex w-full flex-col items-center justify-center gap-2'>
            {/* 이메일 입력 필드 */}
            <InputWithValidation
              label='이메일'
              icon={<MailIcon size={20} />}
              type='email'
              id='id'
              value={id}
              onChange={(e) => handleInputChange(e, 'id')}
              onClickValidCheck={() => handleDuplicateCheck('id')}
              valid={inputStatus.id.valid}
              disabled={inputStatus.id.disabled}
              errorMsg='이메일 주소가 올바르지 않습니다.'
              correctMsg='올바른 이메일 주소입니다.'
              onVisible={onVisible.id}
            />

            {/* 비밀번호 입력 필드 */}
            <InputWithValidation
              label='비밀번호'
              icon={<PasswordIcon size={20} />}
              type='password'
              id='pw'
              value={pw}
              onChange={(e) => handleInputChange(e, 'pw')}
              valid={inputStatus.pw.valid}
              errorMsg='영문과 숫자를 포함하여 6자 이상 입력해주세요'
              correctMsg='사용할 수 있는 비밀번호입니다.'
              onVisible={onVisible.pw}
            />

            {/* 비밀번호 확인 입력 필드 */}
            <InputWithValidation
              label='비밀번호 확인'
              icon={<PasswordIcon size={20} />}
              type='password'
              id='confirmPw'
              value={confirmPw}
              onChange={(e) => handleInputChange(e, 'confirmPw')}
              valid={pw === confirmPw}
              errorMsg='비밀번호가 서로 일치하지 않습니다.'
              correctMsg='비밀번호가 서로 일치합니다.'
              onVisible={onVisible.confirmPw}
            />

            {/* 이름 입력 필드 */}
            <InputWithValidation
              label='이름'
              icon={<UserNameIcon size={20} />}
              type='text'
              id='name'
              value={name}
              onChange={(e) => handleInputChange(e, 'name')}
              onClickValidCheck={() => handleDuplicateCheck('name')}
              valid={inputStatus.name.valid}
              disabled={inputStatus.name.disabled}
              errorMsg='이름이 올바르지 않습니다.'
              correctMsg='올바른 이름입니다.'
              onVisible={onVisible.name}
            />

            {/* 닉네임 입력 필드 */}
            <InputWithValidation
              label='닉네임'
              icon={<NickIcon size={20} />}
              type='text'
              id='nickname'
              value={nickname}
              onChange={(e) => handleInputChange(e, 'nickname')}
              onClickValidCheck={() => handleDuplicateCheck('nickname')}
              valid={inputStatus.nickname.valid}
              disabled={inputStatus.nickname.disabled}
              errorMsg='2~16자 사이의 영어, 숫자, 한글로 입력해주세요'
              correctMsg='사용 가능한 닉네임입니다.'
              onVisible={onVisible.nickname}
            />

            {/* 휴대폰 번호 입력 필드 */}
            <InputWithValidation
              label='휴대폰 번호'
              icon={<PhoneIcon size={24} />}
              type='text'
              id='phone'
              value={phone}
              onChange={(e) => handleInputChange(e, 'phone')}
              onClickValidCheck={() => handleDuplicateCheck('phone')}
              valid={inputStatus.phone.valid}
              disabled={inputStatus.phone.disabled}
              errorMsg='하이픈을 제외한 숫자를 입력해주세요.'
              correctMsg='사용 가능한 번호입니다.'
              onVisible={onVisible.phone}
            />

            {/* 회원가입 버튼 */}
            <div className='flex justify-center'>
              <button
                type='submit'
                className={`flex h-[45px] w-[350px]  items-center justify-center rounded-lg bg-pink-400 text-xl font-semibold text-white transition-all hover:text-white ${
                  isFormValid() ? 'opacity-100' : 'opacity-50'
                }`}
                disabled={!isFormValid()}
              >
                가입하기
              </button>
            </div>
            <div className='flex text-gray-600 '>
              이미 회원이신가요?
              <button className='pl-2 font-semibold text-black'>
                <Link href='/login'>로그인</Link>
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
