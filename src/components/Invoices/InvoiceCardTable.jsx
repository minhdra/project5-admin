import { useState } from 'react';
import PropTypes from 'prop-types';
import Confirm from '../Shared/ConfirmDialog/Confirm';
import Pagination from '../Shared/Pagination/Pagination';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// components

export default function CardTable({
  color,
  titleTable,
  data,
  setData,
  optionSearch,
  searchData,
  itemSelected,
  setItemSelected,
  setShowModal,
  setTitleModal,

  handlePost,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentItems, setCurrentItems] = useState();

  // const handleSearch = (event) => {
  //   searchData({
  //     ...optionSearch,
  //   });
  // };

  const handleShowConfirm = (item) => {
    setShowConfirm(true);
    setItemSelected(item);
  };

  const handleDelete = () => {
    setShowConfirm(false);
    handlePost(itemSelected, 2)
      .then((res) => {
        const newData = data.filter(item => item._id !== itemSelected._id);
        setData(newData);
        toast.success('Cập nhật thành công!');
      })
      .catch((err) => toast.error(err.response.data.message));
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
            <Link
              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              to={'/products'}
              onClick={() => {
                setItemSelected();
              }}
            >
              <i className='fas fa-plus'></i> Thêm mới
            </Link>
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
                ></th>
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
                  Nhân viên thực hiện
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Sản phẩm
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Nhà cung cấp
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Tổng tiền
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Trạng thái thanh toán
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Ngày tạo
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Ngày cập nhật
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
                currentItems.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        <span
                          className={
                            'font-bold ' +
                            +(color === 'light'
                              ? 'text-slate-500'
                              : 'text-white')
                          }
                        >
                          {index + 1}
                        </span>
                      </th>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                        {item.staff?.first_name + ' ' + item.staff?.last_name}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                        {item.product?.product_name}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                        {item.supplier?.supplier_name}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right'>
                        {item.total}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                        {item.paid ? (
                          <span className='text-emerald-500'>
                            Đã thanh toán
                          </span>
                        ) : (
                          <span className='text-red-500'>Chưa thanh toán</span>
                        )}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right'>
                        {formatDate(item.createdAt)}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right'>
                        {formatDate(item.updatedAt)}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                        <div className='flex items-center justify-center gap-1'>
                          <button
                            className='bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                            type='button'
                            onClick={() => {
                              setTitleModal('Cập nhật');
                              setItemSelected(item);
                              setShowModal(true);
                            }}
                          >
                            <i className='fa-regular fa-pencil'></i>
                          </button>
                          <button
                            className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                            type='button'
                            onClick={() => handleShowConfirm(item)}
                          >
                            <i className='fa-regular fa-trash'></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              <tr>
                <td colSpan={1000} className='text-center p-2 font-medium'>
                  <Pagination data={data} setCurrentItems={setCurrentItems} />
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
