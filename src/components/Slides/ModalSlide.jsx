import { useEffect, useRef, useState } from 'react';
import { capitalize } from '../../utils/formatString';
import { modalSlideValidator } from '../../utils/validation';
import { uploadSingle } from '../../services/file';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

let selectedFileThumbnail;
export default function Modal({
  titleModal,
  itemSelected,
  showModal,
  setShowModal,
  handlePost,
}) {
  const titleRef = useRef();
  const redirectToRef = useRef();
  const contentLinkRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (itemSelected && titleRef) {
      titleRef.current.value = itemSelected.title;
      redirectToRef.current.value = itemSelected.redirectTo;
      contentLinkRef.current.value = itemSelected.contentLink;
      setBackgroundImage(itemSelected.backgroundImage);
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    if (titleRef) {
      titleRef.current.value = '';
      redirectToRef.current.value = '';
      contentLinkRef.current.value = '';
    }
  };

  const handleChangeBackgroundImage = (e) => {
    setBackgroundImage(URL.createObjectURL(e.target.files[0]));
    selectedFileThumbnail = e.target.files[0];
  };

  const handleUploadImage = async (file) => {
    let path = '';
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      await uploadSingle(formData)
        .then((res) => (path = res.data.path))
        .catch((err) => alert('Upload error!!!'));
    }

    return path;
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    const data = {
      ...itemSelected,
      title: capitalize(titleRef.current.value),
      redirectTo: redirectToRef.current.value.trim().toLowerCase(),
      contentLink: contentLinkRef.current.value.trim(),
      backgroundImage: backgroundImage.trim(),
    };

    if (selectedFileThumbnail)
      await handleUploadImage(selectedFileThumbnail).then(
        (res) => (data.backgroundImage = res)
      );

    const validator = modalSlideValidator(data);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setIsLoading(false);
      setMessages(arr);
    } else {
      setShowModal(false);
      handlePost(data, itemSelected ? 1 : 0)
        .then((res) => {
          toast.success('Cập nhật thành công!');
          setShowModal(false);
          selectedFileThumbnail = null;
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);

      selectedFileThumbnail = null;
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none focus:outline-none w-5/6 h-full'>
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
                  <div className='w-full lg:w-full px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Title
                      </label>
                      <input
                        ref={titleRef}
                        type='text'
                        placeholder='Title'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={itemSelected?.title}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'title' ? message.message : null
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
                        Background image
                      </label>
                      <label className='block'>
                        <span className='sr-only'>Choose profile photo</span>
                        <input
                          type='file'
                          className='block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-red-50 file:text-red-700
                            hover:file:bg-red-100
                          '
                          accept='image/png, image/jpeg'
                          onChange={handleChangeBackgroundImage}
                        />
                      </label>

                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'backgroundImage'
                            ? message.message
                            : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='w-full px-4 flex'>
                      <div className='relative'>
                        <img
                          alt='...'
                          src={backgroundImage}
                          className='shadow-xl rounded-md h-auto align-middle max-w-150-px border-2 border-red-500'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Content of the link
                      </label>
                      <input
                        ref={contentLinkRef}
                        type='text'
                        placeholder='Content of the link'
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={itemSelected?.contentLink}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'contentLink' ? message.message : null
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
                        Redirect to
                      </label>
                      <input
                        ref={redirectToRef}
                        type='text'
                        placeholder='Example: /test/example'
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={itemSelected?.redirectTo}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'redirectTo' ? message.message : null
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
          <Loading isLoading={isLoading} />
        </>
      ) : null}
    </>
  );
}
