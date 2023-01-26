import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Confirm from '../Shared/ConfirmDialog/Confirm';
import Pagination from '../Shared/Pagination/Pagination';
import { toast } from 'react-toastify';

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

  const nameRef = useRef();

  const handleSearch = (event) => {
    searchData({
      ...optionSearch,
      collect_name: nameRef.current.value,
    });
  };

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
            <button
              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => {
                setTitleModal('Thêm mới');
                setItemSelected();
                setShowModal(true);
              }}
            >
              <i className='fas fa-plus'></i> Thêm mới
            </button>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
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
                    placeholder='Tên bộ sưu tập'
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
              </tr>
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
                  Tên bộ sưu tập
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Path
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Thumbnail
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Hashtag
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
                  Vị trí
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
                  <tr key={item._id}>
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
                      {item.collect_name}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                      {item.path}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt=''
                          className='object-cover w-[100px] h-[50px]'
                        />
                      )}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 max-w-sm overflow-hidden text-ellipsis uppercase'>
                      {item.hashtag && '#' + item.hashtag}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 max-w-sm overflow-hidden text-ellipsis font-medium'>
                      {item.status ? (
                        <span className='text-emerald-500'>Hiển Thị</span>
                      ) : (
                        <span className='text-red-500'>Không Hiển Thị</span>
                      )}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 max-w-sm overflow-hidden text-ellipsis'>
                      {item.order}
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
                ))}

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
