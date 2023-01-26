import { getStatusOrder } from '../../utils/constraints';

export default function DetailOrder({
  titleModal,
  showModal,
  setShowModal,
  itemSelected,
}) {
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
                <div className='flex flex-wrap p-4 max-h-[500px] md:min-w-[600px] overflow-y-auto'>
                  <table className='w-full text-heading font-semibold text-sm lg:text-base'>
                    <thead>
                      <tr>
                        <th className='bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2'>
                          Sản phẩm
                        </th>
                        <th className='bg-gray-150 p-4 text-start last:rounded-te-md w-1/2'>
                          Tổng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemSelected ? (
                        itemSelected.details.map((item) => (
                          <tr className='bitemSelected-b font-normal bitemSelected-gray-300 last:bitemSelected-b-0'>
                            <td className='p-4'>
                              {item.product_name} - {item.color}, {item.size} *{' '}
                              {item.quantity}
                            </td>
                            <td className='p-4'>
                              ₫
                              {(
                                Number(item.product_price) * item.quantity
                              ).toLocaleString('en')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Tổng phụ:</td>
                        <td className='p-4'>
                          ₫
                          {(
                            Number(itemSelected?.total) +
                            Number(itemSelected?.shipping || 0)
                          ).toLocaleString('en')}
                        </td>
                      </tr>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Phí giao hàng:</td>
                        <td className='p-4'>
                          {itemSelected?.shipping
                            ? '₫' +
                              Number(itemSelected?.shipping).toLocaleString(
                                'en'
                              )
                            : '0'}
                        </td>
                      </tr>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Phương thức thanh toán:</td>
                        <td className='p-4'>{itemSelected?.payment_type}</td>
                      </tr>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Tổng:</td>
                        <td className='p-4'>
                          {'₫' +
                            Number(itemSelected?.total).toLocaleString('en')}
                        </td>
                      </tr>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Trạng thái thanh toán:</td>
                        <td className='p-4'>
                          {itemSelected.paid ? (
                            <span className=''>
                              Đã thanh toán
                            </span>
                          ) : (
                            <span className=''>
                              Chưa thanh toán
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Trạng thái giao hàng:</td>
                        <td className='p-4'>
                          {getStatusOrder(itemSelected.delivery_status).message}
                        </td>
                      </tr>
                      <tr className='odd:bg-gray-150'>
                        <td className='p-4 italic'>Ghi chú:</td>
                        <td className='p-4'>
                          {itemSelected?.note || 'Không có ghi chú'}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
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
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
