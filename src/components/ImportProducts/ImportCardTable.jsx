import { useState } from 'react';
import PropTypes from 'prop-types';
import Confirm from '../Shared/ConfirmDialog/Confirm';
import Pagination from '../Shared/Pagination/Pagination';
import { toast } from 'react-toastify';

// components

export default function CardTable({
  color,
  titleTable,
  data,
  searchData,
  itemSelected,
  setItemSelected,
  setShowModal,
  setShowModalInvoice,
  setTitleModal,
  
  handlePost,
  setIndexSelected,
  indexSelected,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentItems, setCurrentItems] = useState();

  const handleShowConfirm = (index) => {
    setShowConfirm(true);
    setIndexSelected(index);
  };

  const handleDelete = () => {
    setShowConfirm(false);
    if (typeof indexSelected === 'number') {
      data.variants.splice(indexSelected, 1);
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
          // setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      
    }
  };

  return (
    <>
      <Confirm
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        handleDelete={handleDelete}
       
      />
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-sky-900 text-white')
        }
      >
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-2 max-w-full flex-grow flex-1'>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-slate-500' : 'text-white')
                }
              >
                {titleTable}
              </h3>
            </div>
            <button
              className={
                'text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ' +
                (currentItems && currentItems?.length > 0 && currentItems?.find(item=>item.status===false)
                  ? 'bg-emerald-500 active:bg-emerald-600'
                  : 'bg-slate-500 active:bg-slate-600')
              }
              type='button'
              disabled={!(currentItems && currentItems?.length > 0 && currentItems?.find(item=>item.status===false))}
              onClick={() => {
                setTitleModal('Xác nhận nhập sản phẩm');
                setItemSelected();
                setShowModalInvoice(true);
              }}
            >
              <i className='fas fa-check'></i> Xác nhận thanh toán
            </button>
            <button
              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => {
                setTitleModal('Nhập sản phẩm');
                setItemSelected();
                setShowModal(true);
              }}
            >
              <i className='fas fa-plus'></i> Nhập sản phẩm
            </button>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              {/* <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  <input
                    ref={nameRef}
                    type='text'
                    className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Tên nhãn sản phẩm'
                    onChange={handleSearch}
                  />
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
              </tr> */}
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  #
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Trạng thái
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Màu
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Mã màu
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Thư viện ảnh
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Giá nhập (vnd)
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Giá bán (vnd)
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Tác vụ
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                      <span
                        className={
                          'font-bold ' +
                          +(color === 'light' ? 'text-slate-500' : 'text-white')
                        }
                      >
                        {index + 1}
                      </span>
                    </th>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                      {item.status ? (
                        <span className='text-emerald-500 font-semibold'>
                          Đã nhập hàng
                        </span>
                      ) : (
                        <span className='text-red-500 font-semibold'>
                          Chưa nhập hàng
                        </span>
                      )}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                      {item.color}
                    </td>
                    <td
                      className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'
                      style={{ color: item.hex }}
                    >
                      {item.hex}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium relative'>
                      <div className='flex items-center -gap-2 flex-wrap'>
                        {item.images &&
                          item.images?.length > 0 &&
                          item.images?.map((image, index) => (
                            <div
                              className='group w-[45px] h-[45px] -mr-4'
                              key={index}
                            >
                              <img
                                src={image}
                                className={
                                  'rounded-full w-full h-full object-cover border-2 ' +
                                  (index % 2 === 0
                                    ? 'border-red-500'
                                    : 'border-violet-500')
                                }
                                alt=''
                              />
                              <img
                                src={image}
                                className={
                                  'w-[200px] object-cover hidden group-hover:block absolute top-0'
                                }
                                alt=''
                              />
                            </div>
                          ))}
                      </div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right text-violet-500'>
                      {item.invoice_price}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right text-red-500'>
                      {item.sell_price}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          className='bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => {
                            setTitleModal('Cập nhật');
                            setItemSelected(item);
                            setIndexSelected(index);
                            setShowModal(true);
                          }}
                        >
                          <i className='fa-regular fa-pencil'></i>
                        </button>
                        <button
                          className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => handleShowConfirm(index)}
                        >
                          <i className='fa-regular fa-trash'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={1000} className='text-center p-2 font-medium'>
                  <Pagination
                    data={data?.variants}
                    setCurrentItems={setCurrentItems}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
