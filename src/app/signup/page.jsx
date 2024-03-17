'use client';
import Image from 'next/image';
import Link from 'next/link';
import axios, { Axios } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon, MailIcon, NickIcon, PasswordIcon, PhoneIcon, UserNameIcon } from '@/components/UI/Icons';
import InputWithValidation from '@/components/InputWithValidation';
export default function SignUpPage() {
  const [inputDisabled, setInputDisabled] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    password: '',
    validCode: '',
    confirmPw: '',
    name: '',
    nickname: '',
    phone: '',
  });
  const [inputStatus, setInputStatus] = useState({
    id: { valid: false, buttonDisabled: true, duplicateCheck: false },
    validCode: { valid: false, buttonDisabled: true, duplicateCheck: false },
    password: { valid: false },
    confirmPw: { valid: false },
    name: { valid: false },
    nickname: { valid: false, buttonDisabled: true, duplicateCheck: false },
    phone: { valid: false, buttonDisabled: true, duplicateCheck: false },
  });

  // 각 입력 필드의 유효성 검사 정규식
  const validationRegex = {
    id: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    validCode: /^.{4,10}$$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    confirmPw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    name: /^[가-힣]{2,5}$/,
    nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
    phone: /^010(\d{3,4})(\d{4})$/,
  };

  // 각 입력 필드 상태 관리 함수
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUserData({ ...userData, [field]: value });
    const isValid = validationRegex[field].test(value);
    setInputStatus({
      ...inputStatus,
      [field]: { valid: isValid, buttonDisabled: !isValid },
    });
  };

  const [isDebouncing, setIsDebouncing] = useState(false);

  // 중복 확인 함수
  const handleDuplicateCheck = async (field) => {
    if (isDebouncing) return;
    setIsDebouncing(true);
    setTimeout(() => {
      setIsDebouncing(false);
    }, 3000);
    const fieldValue = userData[field];
    const buttonDisabled = inputStatus[field].buttonDisabled;
    if (field === 'validCode') {
      try {
        const res = await axios.post(
          '/api/verification',
          { id: userData.id, code: validCode },
          { withCredentials: true },
        );
        if (res.status === 200) {
          setInputStatus({
            ...inputStatus,
            id: { ...inputStatus.id, buttonDisabled: true },
            validCode: { valid: true, buttonDisabled: true, duplicateCheck: true },
          });
          setInputDisabled(true);
          return;
        }
      } catch (err) {
        // setInputDisabled(false);
        setInputStatus({ ...inputStatus, validCode: { valid: false, duplicateCheck: false } });
      }
    }
    if (buttonDisabled) return;
    try {
      const res = await axios.get(`/api/check/${field === 'id' ? 'userid' : field}/${fieldValue}`);
      if (field === 'id') {
        setInputDisabled(false);
        setUserData({
          ...userData,
          validCode: '',
        });
      }
      if (res.status === 200) {
        setInputStatus({
          ...inputStatus,
          [field]: { ...inputStatus[field], duplicateCheck: true },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 모든 입력 필드가 유효한지 확인하는 함수
  const isFormValid = () => {
    const allowedProperties = ['id', 'validCode', 'nickname', 'phone'];
    return (
      Object.values(inputStatus).every((field) => field.valid) &&
      Object.keys(inputStatus)
        .filter((key) => allowedProperties.includes(key))
        .every((key) => inputStatus[key].duplicateCheck)
    );
  };

  // 회원가입 처리 함수
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await axios.post(
        `/api/signup/user`,
        { id, password, name, nickname, phone },
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

  const { id, password, validCode, confirmPw, nickname, name, phone } = userData;
  const router = useRouter();
  const userDataFields = {
    id,
    password,
    validCode,
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
        <section className='absolute left-1/2 top-1/2 flex h-[850px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-pink-200  shadow-[1px_1px_200px_1px]  shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Link href='/'>
              <Image src='/Images/clickpick_icon.png' alt='signup' width={52} height={52} />
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
              buttonDisabled={inputStatus.id.buttonDisabled}
              inputDisabled={inputDisabled}
              correctMsg='올바른 이메일 형식입니다.'
              errorMsg='이메일 주소가 올바르지 않습니다.'
              ValidationCheckMsg='해당 주소로 인증번호를 발송했습니다.'
              duplicateCheck={inputStatus.id.duplicateCheck}
              onVisible={onVisible.id}
            />

            {inputStatus.id.duplicateCheck && (
              <InputWithValidation
                label='인증번호'
                icon={<CheckIcon size={20} />}
                type='text'
                value={validCode}
                onChange={(e) => handleInputChange(e, 'validCode')}
                onClickValidCheck={() => handleDuplicateCheck('validCode')}
                valid={inputStatus.validCode.valid}
                buttonDisabled={inputStatus.validCode.buttonDisabled}
                inputDisabled={inputDisabled}
                errorMsg={'인증번호가 올바르지 않습니다.'}
                correctMsg={'올바른 인증번호 형식입니다.'}
                ValidationCheckMsg='인증번호가 확인되었습니다.'
                duplicateCheck={inputStatus.validCode.duplicateCheck}
                onVisible={onVisible.validCode}
              />
            )}

            {/* 비밀번호 입력 필드 */}
            <InputWithValidation
              label='비밀번호'
              icon={<PasswordIcon size={20} />}
              type='password'
              id='password'
              value={password}
              onChange={(e) => handleInputChange(e, 'password')}
              valid={inputStatus.password.valid}
              errorMsg='영문과 숫자를 포함하여 6자 이상 입력해주세요'
              correctMsg='올바른 비밀번호입니다.'
              onVisible={onVisible.password}
            />

            {/* 비밀번호 확인 입력 필드 */}
            <InputWithValidation
              label='비밀번호 확인'
              icon={<PasswordIcon size={20} />}
              type='password'
              id='confirmPw'
              value={confirmPw}
              onChange={(e) => handleInputChange(e, 'confirmPw')}
              valid={password === confirmPw}
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
              valid={inputStatus.name.valid}
              buttonDisabled={inputStatus.name.buttonDisabled}
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
              buttonDisabled={inputStatus.nickname.buttonDisabled}
              errorMsg='2~16자 사이의 영어, 숫자, 한글로 입력해주세요'
              correctMsg='올바른 닉네임 형식입니다.'
              ValidationCheckMsg='사용할 수 있는 닉네임입니다.'
              duplicateCheck={inputStatus.nickname.duplicateCheck}
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
              buttonDisabled={inputStatus.phone.buttonDisabled}
              errorMsg="'-' 없이 입력해주세요"
              correctMsg='올바른 번호입니다.'
              ValidationCheckMsg='사용할 수 있는 번호입니다.'
              duplicateCheck={inputStatus.phone.duplicateCheck}
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
