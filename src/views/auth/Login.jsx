import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toast from '../../components/Shared/Toasts/Toast';
import { login } from '../../services/auth';
import { loginValidator } from '../../utils/validation';

export default function Login({ setTitle }) {
  useEffect(() => {
    setTitle('Draco - Login');
  }, [setTitle]);

  // const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [data, setData] = useState();
  const [messages, setMessages] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    let user = {};

    if (usernameRef && passwordRef) {
      user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        type: 'admin',
      };
      const validator = loginValidator(user);

      const arr = [];
      setMessages(arr);

      if (validator.error) {
        validator.error.details.forEach((item) =>
          arr.push({ key: item.context.key, message: item.message })
        );

        setMessages(arr);
      } else {
        login(user)
          .then((res) => {
            const data = res?.data?.data?._id;
            window.sessionStorage.setItem('USER_TOKEN', res.data.data.accessToken);
            setData(data);
            toast.success(res.data.message);
            // setAlert({
            //   message: res.data.message,
            //   type: 0,
            // });

            setTimeout(() => {
              if (data) {
                // navigate('/dashboard');
                window.open(window.location.origin + '/dashboard', '_parent');
              }
            }, 3000);
          })
          // .catch((err) => toast.error(err.response.data.message));
      }
    }
  };

  useEffect(() => {
    if (data) window.sessionStorage.setItem('uuid', data);
  }, [data]);

  return (
    <>
      <div className='container mx-auto h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full md:w-1/2 lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-slate-500 text-md font-bold'>
                    Đăng Nhập Draco
                  </h6>
                </div>
                {/* <div className='btn-wrapper text-center'>
                  <button
                    className='bg-white active:bg-slate-50 text-slate-500 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                    type='button'
                  >
                    <img
                      alt='...'
                      className='w-5 mr-1'
                      src={require('../../assets/img/github.svg').default}
                    />
                    Github
                  </button>
                  <button
                    className='bg-white active:bg-slate-50 text-slate-500 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                    type='button'
                  >
                    <img
                      alt='...'
                      className='w-5 mr-1'
                      src={require('../../assets/img/google.svg').default}
                    />
                    Google
                  </button>
                </div> */}
                <hr className='mt-6 border-b-1 border-slate-200' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <form>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Tài Khoản hoặc Email
                    </label>
                    <input
                      type='text'
                      ref={usernameRef}
                      className='border-0 px-3 py-3 placeholder-slate-400 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                      placeholder='Tài khoản hoặc email'
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
                      Mật khẩu
                    </label>
                    <input
                      type='password'
                      ref={passwordRef}
                      className='border-0 px-3 py-3 placeholder-slate-400 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                      placeholder='Mật khẩu'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'password' ? message.message : ''
                      )}
                    </small>
                  </div>

                  <div className='text-center mt-6'>
                    <button
                      className='bg-slate-700 text-white active:bg-slate-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      disabled={data ? true : false}
                      type='submit'
                      onClick={handleLogin}
                    >
                      Đăng Nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative text-lg font-medium'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-slate-100'
                >
                  <small>Quên Mật Khẩu?</small>
                </a>
              </div>
              {/* <div className='w-1/2 text-right'>
                <Link to='/auth/register' className='text-slate-100'>
                  <small>Create new account</small>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </>
  );
}
