import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { registerValidator } from '../../utils/validation';

export default function ModalRegister({
  titleModal,
  showModalRegister,
  setShowModalRegister,
  handlePost,

  role,
}) {
  const [messages, setMessages] = useState([]);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role,
    };

    const validator = registerValidator(data);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setMessages(arr);
    } else {
      handlePost(data, 0)
        .then((res) => {
          toast.success('Đăng ký thành công!');
          setShowModalRegister(false);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };

  return (
    <>
      {showModalRegister ? (
        <>
          <div
            className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            // onClick={() => setShowModal(false)}
          >
            <div className='relative w-full my-6 mx-auto md:w-3/4 lg:w-1/2'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-2xl font-semibold'>{titleModal}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-red-500'
                    onClick={() => setShowModalRegister(false)}
                  >
                    <span className='bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      <i className='fa-regular fa-times'></i>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='flex flex-wrap p-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Tài khoản
                    </label>
                    <input
                      ref={usernameRef}
                      type='text'
                      name='username'
                      className='border-0 px-3 py-3 placeholder-slate-500 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Tài khoản'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'username' ? message.message : null
                      )}
                    </small>
                  </div>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      type='email'
                      name='email'
                      className='border-0 px-3 py-3 placeholder-slate-500 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Email'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'email' ? message.message : null
                      )}
                    </small>
                  </div>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Mật khẩu
                    </label>
                    <input
                      ref={passwordRef}
                      type='password'
                      name='Password'
                      className='border-0 px-3 py-3 placeholder-slate-500 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Mật khẩu'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'password' ? message.message : null
                      )}
                    </small>
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-slate-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModalRegister(false)}
                  >
                    Close
                  </button>
                  <button
                    className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={handleSubmit}
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
