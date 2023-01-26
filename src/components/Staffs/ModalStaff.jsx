import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { formatDatePicker } from '../../utils/formatDate';
import { capitalize } from '../../utils/formatString';
import { modalUserValidator } from '../../utils/validation';
import Loading from '../Shared/Loading/Loading';

export default function Modal({
  titleModal,
  itemSelected,
  showModal,
  setShowModal,
  handlePost,
  
}) {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const birthRef = useRef();
  const phoneRef = useRef();

  const [avatarURL, setAvatarURL] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (itemSelected && firstNameRef) {
      firstNameRef.current.value = itemSelected.first_name || '';
      lastNameRef.current.value = itemSelected.last_name || '';
      emailRef.current.value = itemSelected.email || '';
      setAvatarURL(itemSelected.avatar);
      birthRef.current.value = itemSelected.birth
        ? formatDatePicker(itemSelected.birth)
        : '2000-01-01';
      phoneRef.current.value = itemSelected.phone;
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    if (firstNameRef) {
      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      emailRef.current.value = '';
      birthRef.current.value = '';
      phoneRef.current.value = '';
    }
  };

  const handleChangeAvatarURL = (e) => {
    if (e.target.value.trim()) {
      setAvatarURL(e.target.value.trim());
    } else setAvatarURL(itemSelected?.avatar);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    const data = {
      ...itemSelected,
      first_name: capitalize(firstNameRef.current.value),
      last_name: capitalize(lastNameRef.current.value),
      avatar: avatarURL.trim(),
      email: emailRef.current.value.trim(),
      birth: birthRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
    };

    const validator = modalUserValidator(data);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setMessages(arr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setShowModal(false);
      handlePost(data, itemSelected ? 1 : 0)
        .then((res) => {
          toast.success('Cập nhật thành công!');
          setShowModal(false);
          setIsLoading(false);
          // selectedFileThumbnail = null;
        })
        .catch((err) => toast.error(err.response.data.message));
      
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            // onClick={() => setShowModal(false)}
          >
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-2xl font-semibold'>{titleModal}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-red-500'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      <i className='fa-regular fa-times'></i>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='flex flex-wrap p-4'>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tài khoản
                      </label>
                      <input
                        type='text'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={itemSelected?.user?.username}
                        disabled={itemSelected && true}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'username' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
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
                        placeholder='Email'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'email' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Họ
                      </label>
                      <input
                        ref={firstNameRef}
                        type='text'
                        placeholder='Họ'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'first_name' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tên
                      </label>
                      <input
                        ref={lastNameRef}
                        type='text'
                        placeholder='Tên'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'last_name' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Ngày sinh (mm/dd/yyyy)
                      </label>
                      <input
                        ref={birthRef}
                        type='date'
                        placeholder='Ngày sinh'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'birth' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Số điện thoại
                      </label>
                      <input
                        ref={phoneRef}
                        type='text'
                        placeholder='Số điện thoại'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'phone' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Avatar URL
                      </label>
                      <input
                        type='text'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        onChange={handleChangeAvatarURL}
                        value={avatarURL}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'avatar' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='w-full px-4 flex'>
                      <div className='relative'>
                        <img
                          alt='...'
                          src={
                            avatarURL ??
                            require('../../assets/img/team-2-800x800.jpg')
                          }
                          className='shadow-xl rounded-full h-auto align-middle max-w-[80px] border-2 border-red-500'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-slate-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
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
          <Loading isLoading={isLoading} />
        </>
      ) : null}
    </>
  );
}
