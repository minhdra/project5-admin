import { useEffect, useRef, useState } from 'react';
import { capitalize } from '../../utils/formatString';
import { modalSupplierValidator } from '../../utils/validation';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
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
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const [messages, setMessages] = useState([]);
  const [description, setDescription] = useState();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (itemSelected && nameRef) {
      // nameRef.current.value = itemSelected.name;
      setName(itemSelected.supplier_name);
      setDescription(itemSelected.description);
      emailRef.current.value = itemSelected.email || '';
      phoneRef.current.value = itemSelected.phone;
      addressRef.current.value = itemSelected.address;
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    if (nameRef) {
      // nameRef.current.value = '';
      setDescription('');
      setName('');
      emailRef.current.value = '';
      addressRef.current.value = '';
      phoneRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const dataPost = {
      ...itemSelected,
      supplier_name: capitalize(name),
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      description,
    };

    const validator = modalSupplierValidator(dataPost);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );
      setIsLoading(false);
      setMessages(arr);
    } else
    {
      setIsLoading(false);
      setShowModal(false);
      handlePost(dataPost, itemSelected ? 1 : 0)
        .then((res) => {
          const newData = JSON.parse(JSON.stringify(data));
if (itemSelected) {
            const index = newData.findIndex(
              (item) => item._id === itemSelected._id
            );
            newData[index] = dataPost;
          } else
          {
            dataPost._id = res.data.data._id;
            dataPost.id = res.data.data.id;
            dataPost.createdAt = res.data.data.createdAt;
            dataPost.updatedAt = res.data.data.updatedAt;
            newData.unshift(dataPost);
          }
          setData(newData);
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
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none focus:outline-none w-3/6 h-full'>
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
                <div className='flex flex-wrap p-4 h-[500px] overflow-y-auto'>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tên nhà cung cấp
                      </label>
                      <input
                        ref={nameRef}
                        type='text'
                        placeholder='Tên nhà cung cấp'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'name' ? message.message : null
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

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Email
                      </label>
                      <input
                        ref={emailRef}
                        type='text'
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

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Địa chỉ
                      </label>
                      <input
                        ref={addressRef}
                        type='text'
                        placeholder='Địa chỉ'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'address' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-full px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Mô tả
                      </label>
                      {(description !== undefined || description) && (
                        <SunEditor
                          autoFocus={false}
                          onChange={(content) => setDescription(content)}
                          defaultValue={description}
                          setDefaultStyle={'height: 250px; font-size: 16px'}
                          setOptions={{
                            buttonList: [
                              [
                                'bold',
                                'underline',
                                'italic',
                                'strike',
                                'list',
                                'align',
                                'font',
                                'fontSize',
                                'formatBlock',
                                'fontColor',
                                'hiliteColor',
                                'textStyle',
                                'table',
                                'link',
                                'fullScreen',
                                'codeView',
                              ],
                            ],
                          }}
                        />
                      )}
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'description' ? message.message : null
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
