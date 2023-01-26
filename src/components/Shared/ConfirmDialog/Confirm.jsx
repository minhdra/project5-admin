function Confirm({ showConfirm, setShowConfirm, handleDelete }) {
  return (
    <div className={`fixed top-0 left-0 w-full px-4 z-50 min-h-screen md:items-center md:justify-center ${showConfirm?'md:flex':'hidden'}`}>
      <div className='bg-black opacity-10 w-full h-full absolute z-50 inset-0'></div>
      <div className='bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative'>
        <div className='md:flex items-center'>
          <div className='rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto'>
            <i className='text-[4rem] text-red-500 fa-light fa-circle-exclamation'></i>
          </div>
          <div className='mt-4 md:mt-0 md:ml-6 text-center md:text-left'>
            <p className='font-bold'>Cảnh Báo</p>
            <p className='text-sm text-gray-700 mt-1'>
              Bạn sẽ mất dữ liệu nếu xóa thực hiện hành động này này.
            </p>
          </div>
        </div>
        <div className='text-center md:text-right mt-4 md:flex md:justify-end'>
          <button
            className='block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2'
            autoFocus
            onClick={handleDelete}
          >
            Xác Nhận
          </button>
          <button
            className='block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1'
            onClick={(e) => setShowConfirm(false)}
          >
            Trở Về
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
