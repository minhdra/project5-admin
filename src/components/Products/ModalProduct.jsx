import { useEffect, useRef, useState } from 'react';
import { capitalize, convertToPath } from '../../utils/formatString';
import { modalProductValidator } from '../../utils/validation';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { uploadSingle } from '../../services/file';
import { search as searchSub } from '../../services/subCategory';
import { search as searchBrand } from '../../services/brand';
import { search as searchCollection } from '../../services/collection';
import { search as searchDiscount } from '../../services/discount';
import Loading from '../Shared/Loading/Loading';
import { search as searchCategories } from '../../services/category';
import { Combobox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { toast } from 'react-toastify';

let selectedFileThumbnail;
export default function Modal({
  titleModal,
  itemSelected,
  showModal,
  setShowModal,
  handlePost,
  data,
  setData,
}) {
  const nameProductRef = useRef();
  const pathRef = useRef();
  const originRef = useRef();
  const materialRef = useRef();
  const styleRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [thumbnailURL, setThumbnailURL] = useState('');
  const [validateMessages, setValidateMessages] = useState([]);
  const [description, setDescription] = useState();
  const [title, setTitle] = useState('');

  const [originSubCategories, setOriginSubCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [filteredSubCategories, setFilteredSubCategories] = useState();
  const [querySubCategory, setQuerySubCategory] = useState('');
  const [subCategorySelect, setSubCategorySelect] = useState({});

  const [brandSelect, setBrandSelect] = useState('');
  const [brands, setBrands] = useState();

  const [collectionSelect, setCollectionSelect] = useState('');
  const [collections, setCollections] = useState();

  const [discountSelect, setDiscountSelect] = useState('');
  const [discounts, setDiscounts] = useState();

  const [categories, setCategories] = useState();
  const [filteredCategories, setFilteredCategories] = useState();
  const [queryCategory, setQueryCategory] = useState('');
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (itemSelected && pathRef) {
      setTitle(itemSelected.product_name);
      pathRef.current.value = itemSelected.path;
      originRef.current.value = itemSelected.origin;
      materialRef.current.value = itemSelected.material;
      styleRef.current.value = itemSelected.style;
      setDescription(itemSelected.description);
      setThumbnailURL(itemSelected.thumbnail);
      setSubCategorySelect(itemSelected.category_sub || {});
      setBrandSelect(itemSelected.brand.id);
      setDiscountSelect(itemSelected?.discount?.id ?? '');
      setCollectionSelect(itemSelected?.collect?.id ?? '');
      setCategory(itemSelected.category);
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    if (nameProductRef) {
      // nameProductRef.current.value = '';
      setDescription('');
      setTitle('');
      // contentRef.current.value = '';
    }
  };

  const handleChangeThumbnailURL = (e) => {
    setThumbnailURL(URL.createObjectURL(e.target.files[0]));
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
    // const uuid = window.sessionStorage.getItem('uuid');
    const dataPost = {
      ...itemSelected,
      product_name: capitalize(title),
      path: pathRef.current.value,
      category: category?.id,
      category_sub: subCategorySelect?.id,
      discount: Number(discountSelect || 0),
      collect: Number(collectionSelect || 0),
      brand: Number(brandSelect || 0),
      origin: capitalize(originRef.current.value),
      material: capitalize(materialRef.current.value),
      style: capitalize(styleRef.current.value),
      description,
      // updatedId: uuid,
    };

    // if (!itemSelected) dataPost.createId = uuid;
    // else dataPost.createdId = itemSelected.createdId[0]._id;
    if (selectedFileThumbnail)
      await handleUploadImage(selectedFileThumbnail).then(
        (res) => (dataPost.thumbnail = res)
      );

    const validator = modalProductValidator(dataPost);
    // console.log(validator);
    const arr = [];
    setValidateMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setValidateMessages(arr);
      setIsLoading(false);
    } else {
      handlePost(dataPost, itemSelected ? 1 : 0)
        .then((res) => {
          dataPost.category = category;
          dataPost.category_sub = subCategorySelect;
          dataPost.discount = discounts.find(item => item.id === dataPost.discount);
          dataPost.brand = brands.find(item => item.id === dataPost.brand);
          dataPost.collect = collections.find(item => item.id === dataPost.collect);
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
          selectedFileThumbnail = null;
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);
      //
    }
  };

  // Get all categories
  useEffect(() => {
    searchCategories().then((res) => setCategories(res));
  }, []);

  // Get all sub categories
  useEffect(() => {
    searchSub({
      sub_category_name: '',
    }).then((res) => setOriginSubCategories(res));
  }, []);

  // Get all brands
  useEffect(() => {
    searchBrand({
      brand_name: '',
    }).then((res) => setBrands(res));
  }, []);

  // Get all collections
  useEffect(() => {
    searchCollection({
      collect_name: '',
    }).then((res) => setCollections(res));
  }, []);

  // Get all discounts
  useEffect(() => {
    searchDiscount({
      discount_name: '',
    }).then((res) => setDiscounts(res));
  }, []);

  const handleInputChange = (key) => {
    const messages = JSON.parse(JSON.stringify(validateMessages)).filter(
      (item) => item.key !== key
    );

    setValidateMessages(messages);
  };

  // Get sub categories
  useEffect(() => {
    if (category && category?.id && originSubCategories) {
      const result = originSubCategories.filter(
        (item) => item.category.id === category.id
      );
      setSubCategories(result);
    }
  }, [category, originSubCategories]);

  // filter categories
  useEffect(() => {
    if (categories) {
      const filtered =
        queryCategory === ''
          ? categories
          : categories.filter((item) => {
              return item.category_name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(queryCategory.toLowerCase().replace(/\s+/g, ''));
            });

      setFilteredCategories(filtered);
    }
  }, [queryCategory, categories]);

  // filter sub categories
  useEffect(() => {
    if (subCategories) {
      const filtered =
        querySubCategory === ''
          ? subCategories
          : subCategories.filter((item) => {
              return item.sub_category_name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(querySubCategory.toLowerCase().replace(/\s+/g, ''));
            });

      setFilteredSubCategories(filtered);
    }
  }, [querySubCategory, subCategories]);

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
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tên sản phẩm <span className='text-red-500'>*</span>
                      </label>
                      <input
                        ref={nameProductRef}
                        type='text'
                        placeholder='Tên sản phẩm'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'product_name'
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
                        Path <span className='text-red-500'>*</span>
                      </label>
                      <input
                        ref={pathRef}
                        type='text'
                        placeholder='Tên sản phẩm'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={convertToPath(title)}
                        disabled
                      />
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'path' ? message.message : null
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
                        Danh mục lớn <span className='text-red-500'>*</span>
                      </label>
                      <Combobox value={category} onChange={setCategory}>
                        <div className='relative w-full cursor-default rounded-lg bg-white text-left sm:text-sm'>
                          <Combobox.Input
                            id='category'
                            className={
                              'border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium ' +
                              (validateMessages.find(
                                (message) => message.key === 'category'
                              )
                                ? 'border-red-600'
                                : 'border-gray-300')
                            }
                            placeholder={'Danh mục lớn'}
                            displayValue={(item) => item?.category_name}
                            spellCheck={false}
                            onChange={(event) =>
                              setQueryCategory(event.target.value)
                            }
                          />
                          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-caret-down-fill'
                              viewBox='0 0 16 16'
                            >
                              <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                            </svg>
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                          afterLeave={() => setQueryCategory('')}
                        >
                          <Combobox.Options className='absolute mt-1 max-h-60 w-full md:w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30'>
                            {filteredCategories &&
                            filteredCategories?.length === 0 &&
                            queryCategory !== '' ? (
                              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                                Không tìm thấy gì.
                              </div>
                            ) : (
                              filteredCategories?.map((item) => (
                                <Combobox.Option
                                  key={item._id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? 'bg-teal-600 text-white'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={item}
                                  onClick={() => {
                                    setSubCategorySelect({});
                                    setFilteredSubCategories([]);
                                    handleInputChange('category');
                                  }}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {item.category_name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? 'text-white'
                                              : 'text-teal-600'
                                          }`}
                                        >
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-check2'
                                            viewBox='0 0 16 16'
                                          >
                                            <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                                          </svg>
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </Combobox>
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'category' ? message.message : null
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
                        Danh mục nhỏ <span className='text-red-500'>*</span>
                      </label>
                      <Combobox
                        value={subCategorySelect}
                        onChange={setSubCategorySelect}
                      >
                        <div className='relative w-full cursor-default rounded-lg bg-white text-left sm:text-sm'>
                          <Combobox.Input
                            id='sub-category'
                            className={
                              'border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium ' +
                              (validateMessages.find(
                                (message) => message.key === 'category_sub'
                              )
                                ? 'border-red-600'
                                : 'border-gray-300')
                            }
                            placeholder={'Danh mục nhỏ'}
                            displayValue={(item) => item?.sub_category_name}
                            spellCheck={false}
                            onChange={(event) =>
                              setQuerySubCategory(event.target.value)
                            }
                          />
                          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-caret-down-fill'
                              viewBox='0 0 16 16'
                            >
                              <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                            </svg>
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                          afterLeave={() => setQuerySubCategory('')}
                        >
                          <Combobox.Options className='absolute mt-1 max-h-60 w-full md:w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30'>
                            {filteredSubCategories &&
                            filteredSubCategories?.length === 0 &&
                            querySubCategory !== '' ? (
                              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                                Không tìm thấy gì.
                              </div>
                            ) : (
                              filteredSubCategories?.map((item) => (
                                <Combobox.Option
                                  key={item._id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? 'bg-teal-600 text-white'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={item}
                                  onClick={() => {
                                    handleInputChange('category_sub');
                                  }}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {item.sub_category_name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? 'text-white'
                                              : 'text-teal-600'
                                          }`}
                                        >
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-check2'
                                            viewBox='0 0 16 16'
                                          >
                                            <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                                          </svg>
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </Combobox>
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'category_sub'
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
                        Thương hiệu <span className='text-red-500'>*</span>
                      </label>
                      <select
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                        value={brandSelect}
                        onChange={(e) => setBrandSelect(e.target.value)}
                      >
                        <option value=''>Chọn một thương hiệu</option>
                        {brands &&
                          brands.map((item) => (
                            <option key={item._id} value={item.id}>
                              {item.brand_name}
                            </option>
                          ))}
                      </select>
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'brand' ? message.message : null
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
                        Bộ sưu tập
                      </label>
                      <select
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                        value={collectionSelect}
                        onChange={(e) => setCollectionSelect(e.target.value)}
                      >
                        <option value=''>Chọn một bộ sưu tập</option>
                        {collections &&
                          collections.map((item) => (
                            <option key={item._id} value={item.id}>
                              {item.collect_name}
                            </option>
                          ))}
                      </select>
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'collect' ? message.message : null
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
                        Giảm giá
                      </label>
                      <select
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                        value={discountSelect}
                        onChange={(e) => setDiscountSelect(e.target.value)}
                      >
                        <option value=''>Chọn một mã giảm giá</option>
                        {discounts &&
                          discounts.map((item) => (
                            <option key={item._id} value={item.id}>
                              {item.discount_percent +
                                '% - ' +
                                (item.discount_name || 'noname')}
                            </option>
                          ))}
                      </select>
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'discount' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Ảnh bìa <span className='text-red-500'>*</span>
                      </label>
                      <label className='block'>
                        <span className='sr-only'>Chọn ảnh</span>
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
                          onChange={handleChangeThumbnailURL}
                        />
                      </label>
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'thumbnail' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='w-full px-4 flex'>
                      <div className='relative'>
                        <img
                          alt='...'
                          src={thumbnailURL}
                          className='shadow-xl rounded-md h-auto align-middle max-w-150-px border-2 border-red-500'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Xuất xứ <span className='text-red-500'>*</span>
                      </label>
                      <input
                        ref={originRef}
                        type='text'
                        placeholder='Xuất xứ'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={'Việt Nam'}
                      />
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'origin' ? message.message : null
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
                        Chất liệu <span className='text-red-500'>*</span>
                      </label>
                      <input
                        ref={materialRef}
                        type='text'
                        placeholder='Chất liệu'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={'Jean'}
                      />
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'material' ? message.message : null
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
                        Phong cách <span className='text-red-500'>*</span>
                      </label>
                      <input
                        ref={styleRef}
                        type='text'
                        placeholder='Phong cách'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        defaultValue={'Đường phố'}
                      />
                      <small className='text-red-500 font-medium'>
                        {validateMessages.map((message) =>
                          message.key === 'style' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>

                  <div className='w-full lg:w-full px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Mô tả <span className='text-red-500'>*</span>
                      </label>
                      {(description !== undefined || description) && (
                        <SunEditor
                          autoFocus={false}
                          onChange={(description) =>
                            setDescription(description)
                          }
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
                        {validateMessages.map((message) =>
                          message.key === 'description' ? message.message : null
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
