'use client';
export default function InputWithValidation({
  label,
  icon,
  type,
  id,
  value,
  onChange,
  onClickValidCheck,
  valid,
  disabled,
  errorMsg,
  correctMsg,
  ValidationCheckMsg,
  onVisible,
  duplicateCheck,
}) {
  const defaultInputStyle = 'h-[45px] rounded-lg pl-7 outline-none';
  const correctMsgStyle = 'flex w-[350px] text-sm text-blue-600';
  const errorMsgStyle = 'flex w-[350px] text-sm text-red-600';
  const validCheckVisible =
    label === '비밀번호' || label === '비밀번호 확인' || label === '이름' ? 'invisible' : 'visible';
  return (
    <>
      <div className='relative flex w-[350px] flex-col'>
        {icon}
        <input
          placeholder={label}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required
          className={`${defaultInputStyle}`}
        />
        <div className={`absolute right-2 flex h-full items-center ${validCheckVisible}`}>
          <button
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              onClickValidCheck();
            }}
            className={`${valid ? 'bg-pink-300 hover:bg-pink-500 hover:text-white' : 'bg-gray-200'} rounded-md px-3 py-1 text-sm transition-all`}
          >
            중복 확인
          </button>
        </div>
      </div>
      {valid ? (
        <div className={`${onVisible} ${correctMsgStyle}`}>{duplicateCheck ? ValidationCheckMsg : correctMsg}</div>
      ) : (
        <div className={`${onVisible} ${errorMsgStyle}`}>{errorMsg}</div>
      )}
    </>
  );
}
