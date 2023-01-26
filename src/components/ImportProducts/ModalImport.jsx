import { useEffect, useState } from 'react';
import { capitalize } from '../../utils/formatString';
import { modalProductVariantNoSizeValidator, modalProductVariantValidator } from '../../utils/validation';
import Loading from '../Shared/Loading/Loading';
import ntc from '../../utils/convertNameColor';
import { formatNumberPrice, formatOnlyNumber } from '../../utils/formatNumber';
import { uploadMulti } from '../../services/file';
import _ from 'lodash';
import { toast } from 'react-toastify';

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

let listImages;
export default function Modal({
  titleModal,
  itemSelected,
  showModal,
  setShowModal,
  handlePost,

  data,
  indexSelected,
}) {
  const [messages, setMessages] = useState([]);
  const [color, setColor] = useState('');
  const [hex, setHex] = useState('#000000');
  const [invoicePrice, setInvoicePrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [quantityNoSize, setQuantityNoSize] = useState('');
  const [size, setSize] = useState('XS');
  const [listShowImages, setListShowImages] = useState([]);
  const [listSizes, setListSizes] = useState([]);

  const [hasSize, setHasSize] = useState(true);

  useEffect(() => {
    if (itemSelected) {
      // colorRef.current.value = itemSelected.name;
      setColor(itemSelected.color);
      setHex(itemSelected.hex);
      setInvoicePrice(itemSelected.invoice_price);
      setSellPrice(itemSelected.sell_price);
      setListShowImages(itemSelected.images);
      setListSizes(itemSelected.list_sizes);
      if (typeof itemSelected.has_size === 'boolean')
        setHasSize(itemSelected.has_size);
      setQuantityNoSize(itemSelected.quantityNoSize);
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    if (true) {
      // colorRef.current.value = '';
      setColor('');
      // contentRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const variant = {
      ...itemSelected,
      color: capitalize(color),
      hex,
      invoice_price: invoicePrice,
      sell_price: sellPrice,
      has_size: hasSize,
    };

    if (!hasSize) variant.quantityNoSize = quantityNoSize;
    else variant.list_sizes = listSizes;

    if (listImages) {
      await handleUploadImages(listImages).then((res) => {
        const images = res;
        variant.images = images;
      });
    } else variant.images = itemSelected ? itemSelected.images : [];

    let validator
    if (hasSize)
    {
      delete variant.quantityNoSize;
      validator = modalProductVariantValidator(variant);
    }
    else
    {
      delete variant.list_sizes;
      validator = modalProductVariantNoSizeValidator(variant);
    }
    
    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );
      setIsLoading(false);
      setMessages(arr);
    } else {
      if (itemSelected) {
        // check if list size has changed
        const check = _.isEqual(
          variant.list_sizes,
          data.variants[indexSelected].list_sizes
        );
        if (!check) variant.status = false;
        data.variants[indexSelected] = variant;
      } else {
        variant.status = false;
        data.variants.push(variant);
      }
      data.brand = data.brand.id;
      data.category = data.category?.id;
      data.category_sub = data.category_sub?.id;
      data.collect = data.collect?.id;
      data.discount = data.discount?.id;
      data.supplier = data.supplier?.id;
      handlePost(data, 1)
        .then((res) => {
          toast.success('Cập nhật thành công!');
          setShowModal(false);
          listImages = null;
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);
    }
  };

  const handleChangeGallery = (e) => {
    const files = Array.from(e.target.files);
    listImages = files;
    setListShowImages(files);
  };

  const handleUploadImages = async (files) => {
    let listPaths = [];
    if (files) {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      await uploadMulti(formData)
        .then(
          (res) =>
            (listPaths = res.data.images.reduce(
              (prev, curr) => [...prev, curr.path],
              []
            ))
        )
        .catch(() => alert('Tải ảnh thất bại!'));
    }

    return listPaths;
  };

  const handleAddToListSize = () => {
    const c = listSizes.find((item) => item.size === size);
    if (!quantity || quantity <= 0)
      return alert('Không thể để trống số lượng!');
    if (!c) {
      setListSizes([
        ...listSizes,
        {
          size,
          quantity,
        },
      ]);
    } else alert('Không thể đặt size trùng nhau!');
  };

  const handleRemoveSize = (size) => {
    const ask = window.confirm('Bạn có chắc muốn xóa size không?');
    if (ask) {
      const c = listSizes.findIndex((item) => item.size === size);
      if (c >= 0) {
        const arr = listSizes.filter((item) => item.size !== size);
        setListSizes(arr);
      }
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none focus:outline-none min-w-3/6 h-full'>
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
                <div className='flex flex-wrap p-4 max-h-[500px] overflow-y-auto'>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Chọn màu <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='color'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[44px]'
                        value={hex}
                        onChange={(e) => {
                          const c = ntc.name(e.target.value);
                          setColor(c.color);
                          setHex(c.hex);
                        }}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'hex' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Màu sắc <span className='text-red-500'>*</span>{' '}
                        <span className='text-red-500'>({hex})</span>
                      </label>
                      <input
                        type='text'
                        placeholder='Màu sắc'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'color' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Giá nhập (VND) <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        placeholder='Giá nhập'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={invoicePrice}
                        onChange={(e) => {
                          setSellPrice(formatNumberPrice(e.target.value, true));
                          setInvoicePrice(formatNumberPrice(e.target.value));
                        }}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'invoice_price'
                            ? message.message
                            : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Giá bán (VND) <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        placeholder='Giá bán'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={sellPrice}
                        onChange={(e) =>
                          setSellPrice(formatNumberPrice(e.target.value))
                        }
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'sell_price' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Thư viện ảnh (có thể chọn nhiều){' '}
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='file'
                        className='block w-full text-sm text-slate-800 font-semibold
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-red-50 file:text-red-700
                            hover:file:bg-red-100
                          '
                        accept='image/png, image/jpeg'
                        multiple
                        onChange={handleChangeGallery}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'images' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Thư viện
                      </label>
                      <div className='flex items-center -gap-2 flex-wrap'>
                        {listShowImages &&
                          listShowImages?.length > 0 &&
                          listShowImages?.map((item, index) => (
                            <img
                              key={index}
                              src={
                                typeof item === 'string'
                                  ? item
                                  : URL.createObjectURL(item)
                              }
                              className={
                                'rounded-full w-[50px] h-[50px] object-cover border-2 -mr-4 ' +
                                (index % 2 === 0
                                  ? 'border-red-500'
                                  : 'border-violet-500')
                              }
                              alt=''
                            />
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='bg-slate-200 p-2 rounded-md'>
                      <div className='flex items-center mb-4 select-none'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          checked={hasSize}
                          value={hasSize}
                          onChange={() => setHasSize(!hasSize)}
                          className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 uppercase text-sm font-medium text-red-600 dark:text-gray-300'
                        >
                          Sản Phẩm Có Size?
                        </label>
                      </div>

                      {hasSize ? (
                        <>
                          <div className='relative w-full mb-3'>
                            <label
                              className='block uppercase text-slate-800 text-xs font-bold mb-2'
                              htmlFor='grid-password'
                            >
                              Chọn size <span className='text-red-500'>*</span>
                            </label>
                            <select
                              className='border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {sizes &&
                                sizes.map((item, index) => (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className='relative w-full mb-3'>
                            <label
                              className='block uppercase text-slate-800 text-xs font-bold mb-2'
                              htmlFor='grid-password'
                            >
                              Số lượng nhập{' '}
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              placeholder='Số lượng'
                              className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(formatOnlyNumber(e.target.value))
                              }
                            />
                          </div>
                          <div className='relative w-full mb-3'>
                            <button
                              className='bg-violet-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-violet-600'
                              onClick={handleAddToListSize}
                            >
                              Thêm size
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='relative w-full mb-3'>
                            <label
                              className='block uppercase text-slate-800 text-xs font-bold mb-2'
                              htmlFor='grid-password'
                            >
                              Số lượng nhập{' '}
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              placeholder='Số lượng'
                              className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                              value={quantityNoSize}
                              onChange={(e) =>
                                setQuantityNoSize(
                                  formatOnlyNumber(e.target.value)
                                )
                              }
                            />
                            <small className='text-red-500 font-medium'>
                              {messages.map((message) =>
                                message.key === 'quantityNoSize'
                                  ? message.message
                                  : null
                              )}
                            </small>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Danh sách sizes <span className='text-red-500'>*</span>
                      </label>
                      <div className='flex flex-col gap-2 bg-slate-200 p-2 rounded-md'>
                        {listSizes && listSizes?.length > 0 ? (
                          listSizes.map((item, index) => (
                            <div
                              key={index}
                              className='flex gap-2 items-center'
                            >
                              <div>
                                <span className='font-semibold text-red-600'>
                                  Size:
                                </span>{' '}
                                {item.size}
                              </div>
                              <div>
                                <span className='font-semibold text-red-600'>
                                  Quantity:
                                </span>{' '}
                                {item.quantity}
                              </div>
                              <div
                                className='hover:text-violet-500 text-lg cursor-pointer'
                                onClick={() => handleRemoveSize(item.size)}
                              >
                                <i className='fa-sharp fa-solid fa-circle-xmark'></i>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>Danh sách trống</div>
                        )}
                      </div>
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'list_sizes' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-slate-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
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
