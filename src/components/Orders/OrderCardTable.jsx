import { useState } from 'react';
import PropTypes from 'prop-types';
import Confirm from '../Shared/ConfirmDialog/Confirm';
import Pagination from '../Shared/Pagination/Pagination';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'react-toastify';
import { convertObjectToArray } from '../../utils/constraints';
import { common } from '../../common/common';
import {
  getProductById as getByIdProduct,
  update,
} from '../../services/product';

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
        const newData = data.filter((item) => item._id !== itemSelected._id);
        setData(newData);
        toast.success('Cập nhật thành công!');
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const handleChangeDeliveryStatus = (item) => {
    const itemPost = JSON.parse(JSON.stringify(item));
    itemPost.customer = itemPost.customer._id;

    if (itemPost.delivery_status === 0) {
      itemPost.details.forEach(async (detail) => {
        const product = await getByIdProduct(detail.product_id);
        product.variants.forEach((variant) => {
          if (detail.color === variant.color && detail.hex === variant.hex) {
            variant.list_sizes.forEach((size) => {
              if (size.size === detail.size) {
                const quantity = Number(size.quantity);
                if (quantity > detail.quantity) {
                  size.quantity = quantity - detail.quantity;
                  handlePost(itemPost, 1)
                    .then((res) => {
                      toast.success('Cập nhật thành công!');
                    })
                    .catch((err) => toast.error(err.response.data.message));
                } else toast.info('Số lượng trong kho không đủ');
              }
            });
          }
        });

        product.brand = product.brand?.id;
        product.category = product.category?.id;
        product.category_sub = product.category_sub?.id;
        product.collect = product.collect?.id;
        product.discount = product.discount?.id;
        product.supplier = product.supplier?.id;
        await update(product);
      });
    } else
      handlePost(itemPost, 1)
        .then((res) => {
          toast.success('Cập nhật thành công!');
        })
        .catch((err) => toast.error(err.response.data.message));
  };

  const handleChangePaidStatus = (item) => {
    const itemPost = JSON.parse(JSON.stringify(item));
    itemPost.customer = itemPost.customer._id;

    handlePost(itemPost, 1)
      .then((res) => {
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
            {/* <button
              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => {
                setTitleModal('Thêm mới');
                setItemSelected();
                setShowModal(true);
              }}
            >
              <i className='fas fa-plus'></i> Thêm mới
            </button> */}
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
                  Khách hàng
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Tổng
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Số chi tiết
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
                  Phương thức thanh toán
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Trạng thái đơn hàng
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
                        {item.customer?.first_name
                          ? item.customer?.first_name +
                            ' ' +
                            item.customer?.last_name
                          : item.customer?.path}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right'>
                        {Number(item.total).toLocaleString('en')}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right'>
                        {item.details?.length || 0}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium cursor-pointer'>
                        <select
                          id='paid'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          defaultValue={item.paid}
                          onChange={(e) => {
                            item.paid = e.target.value === 'true';
                            handleChangePaidStatus(item);
                          }}
                        >
                          <option value={true}>Đã thanh toán</option>
                          <option value={false}>Chưa thanh toán</option>
                        </select>
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                        {item.payment_type === 'vnpay' ? (
                          <span className=''>VNPay</span>
                        ) : (
                          <span className=''>Khi nhận</span>
                        )}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                        <select
                          id='countries'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          defaultValue={item.delivery_status}
                          onChange={(e) => {
                            item.delivery_status = Number(e.target.value);
                            handleChangeDeliveryStatus(item);
                          }}
                        >
                          {common.orderStatuses &&
                            convertObjectToArray(common.orderStatuses).map(
                              (item) => (
                                <option key={item.id} value={item.id}>
                                  {item.message}
                                </option>
                              )
                            )}
                        </select>
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium text-right'>
                        {formatDate(item.createdAt)}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                        <div className='flex items-center justify-center gap-1'>
                          <button
                            className='bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                            type='button'
                            onClick={() => {
                              setTitleModal('Thông tin đơn hàng ' + item.id);
                              setItemSelected(item);
                              setShowModal(true);
                            }}
                          >
                            <i className='fa-regular fa-eye'></i>
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
