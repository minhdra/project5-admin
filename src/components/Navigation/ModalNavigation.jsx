import { useEffect, useRef, useState } from 'react';
import { capitalize, convertToPath } from '../../utils/formatString';
import { modalNavigationValidator } from '../../utils/validation';
import Loading from '../Shared/Loading/Loading';
import { toast } from 'react-toastify';

export default function Modal({
  titleModal,
  itemSelected,
  showModal,
  setShowModal,
  handlePost,
  data,
  setData,
}) {
  const [messages, setMessages] = useState([]);

  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');
  const [icon, setIcon] = useState('');
  const [isAdmin, setIsAdmin] = useState();
  const [order, setOrder] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (itemSelected) {
      // brandNameRef.current.value = itemSelected.name;
      setTitle(itemSelected.title);
      setPath(itemSelected.path);
      setIcon(itemSelected.icon);
      setIsAdmin(itemSelected.isAdmin);
      setOrder(itemSelected.order);
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    setTitle('');
    setPath('');
    setIcon('');
    setIsAdmin(false);
    setOrder(0);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const dataPost = {
      ...itemSelected,
      title,
      path,
      icon,
      isAdmin,
      order,
    };

    const validator = modalNavigationValidator(dataPost);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );
      setIsLoading(false);
      setMessages(arr);
    } else {
      handlePost(dataPost, itemSelected ? 1 : 0)
        .then((res) => {
          const newData = JSON.parse(JSON.stringify(data));
          if (itemSelected) {
            const index = newData.findIndex(
              (item) => item._id === itemSelected._id
            );
            newData[index] = dataPost;
          } else {
            dataPost._id = res.data.data._id;
            dataPost.id = res.data.data.id;
            dataPost.createdAt = res.data.data.createdAt;
            dataPost.updatedAt = res.data.data.updatedAt;
            newData.unshift(dataPost);
          }
          setData(newData);
          toast.success('Cập nhật thành công!');
          setShowModal(false);
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none focus:outline-none h-full'>
            <div className='relative w-auto my-6 mx-auto max-w-10/12 overflow-y-auto'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto'>
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
                <div className='flex flex-wrap p-4 overflow-y-auto'>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tiêu đề
                      </label>
                      <input
                        type='text'
                        placeholder='Tiêu đề'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'title' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Path
                      </label>
                      <input
                        type='text'
                        placeholder='Đường dẫn trang'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'path' ? message.message : null
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
                        Icon (Show: <i className={'text-red-600 ' + icon}></i>)
                      </label>
                      <input
                        type='text'
                        placeholder='Sử dụng icon bootstrap: fas fa-bars'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'icon' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Dùng cho
                      </label>
                      <select
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={isAdmin}
                        onChange={(e) =>
                          setIsAdmin(/^true$/i.test(e.target.value))
                        }
                      >
                        <option value={true}>Admin</option>
                        <option value={false}>Client</option>
                      </select>
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'isAdmin' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Order
                      </label>
                      <input
                        type='number'
                        placeholder='Thứ hạng'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'order' ? message.message : null
                        )}
                      </small>
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
