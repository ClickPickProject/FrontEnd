export default function layout({ children }) {
  // h-[100dvh]
  return <div className='mx-auto flex max-w-5xl bg-white'>{children}</div>;
}
