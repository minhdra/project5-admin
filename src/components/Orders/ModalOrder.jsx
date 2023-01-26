import { useEffect, useState } from 'react';
import { modalInvoiceValidator } from '../../utils/validation';
import Loading from '../Shared/Loading/Loading';
import { search } from '../../services/supplier';
import { toast } from 'react-toastify';

export default function ModalOrder({
  titleModal,
  showModal,
  setShowModal,
  handlePost,
  itemSelected,
  data,
  setData,
}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [staff, setStaff] = useState();
  const [product, setProduct] = useState();
  const [suppliers, setSuppliers] = useState();
  const [supplier, setSupplier] = useState();
  const [paid, setPaid] = useState(true);
  const [total, setTotal] = useState('');
  const [details, setDetails] = useState();

  useEffect(() => {
    if (itemSelected) {
      setStaff(itemSelected.staff);
      setProduct(itemSelected.product);
      setSupplier(itemSelected.supplier.id);
      setDetails(itemSelected.details);
      setTotal(itemSelected.total);
      setPaid(itemSelected.paid);
    }
  }, [itemSelected]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const dataPost = {
      ...itemSelected,
      staff: staff._id,
      product: product.id,
      supplier,
      paid,
      total,
      details,
    };

    const validator = modalInvoiceValidator(dataPost);

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
          setIsLoading(false);
          setShowModal(false);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };

  // Get suppliers
  useEffect(() => {
    search({
      supplier_name: '',
      phone: '',
      email: '',
      address: '',
      page: 1,
      pageSize: 10,
    }).then((data) => setSuppliers(data));
  }, []);

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
                        Nhân viên thực hiện{' '}
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[44px]'
                        value={
                          staff?.first_name +
                          ' ' +
                          staff?.last_name +
                          ' | ID:' +
                          staff?.id
                        }
                        disabled
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'staff' ? message.message : null
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
                        Sản phẩm <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[44px]'
                        value={product?.product_name + ' | ID:' + product?.id}
                        disabled
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'product' ? message.message : null
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
                        Công ty cung cấp <span className='text-red-500'>*</span>
                      </label>
                      <select
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        disabled
                      >
                        <option value=''>Chọn một công ty</option>
                        {suppliers &&
                          suppliers.map((item) => (
                            <option key={item._id} value={item.id}>
                              {item.supplier_name}
                            </option>
                          ))}
                      </select>
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'supplier' ? message.message : null
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
                        Đã thanh toán? <span className='text-red-500'>*</span>
                      </label>
                      <select
                        className='border-0 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-medium'
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                      >
                        <option value={true}>Đã thanh toán</option>
                        <option value={false}>Chưa thanh toán</option>
                      </select>
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'paid' ? message.message : null
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
                        Tổng thanh toán (vnd)
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-800 font-semibold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-[44px]'
                        value={total}
                        disabled
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'total' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-800 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Danh sách sản phẩm nhập{' '}
                        <span className='text-red-500'>*</span>
                      </label>
                      <div className='p-2 bg-slate-200 rounded-md'>
                        {details &&
                          details.map((item, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-4'
                            >
                              <div>
                                {index + 1}. Color: {item.color}
                              </div>
                              <div>
                                Quantity:{' '}
                                {item.list_sizes.reduce(
                                  (prev, curr) =>
                                    (prev += Number(curr.quantity)),
                                  0
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'details' ? message.message : null
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
