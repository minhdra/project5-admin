import { useEffect, useState } from 'react';

export default function AlertAuth({ message, setMessage }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (message) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setMessage();
      }, 5000);
    } else setShowAlert(false);
  }, [message, setMessage]);

  return (
    <div
      className={`text-white px-6 w-auto py-4 border-0 rounded fixed top-[3.5rem] right-7 mb-4 bg-${
        message?.type === 0 ? 'emerald' : 'red'
      }-500 z-50 ${showAlert ? 'block' : 'hidden'}`}
    >
      <span className='text-xl inline-block mr-5 align-middle'>
        {message?.type === 0 ? (
          <svg
            className='animate-spin -ml-1 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        ) : (
          <i className='fa-regular fa-bell'></i>
        )}
      </span>
      <span className='inline-block align-middle mr-8'>{message?.message}</span>
      <button
        className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
        onClick={() => {
          setShowAlert(false);
          setMessage();
        }}
      >
        <span>×</span>
      </button>
    </div>
  );
}
