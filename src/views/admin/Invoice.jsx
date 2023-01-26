import React, { useEffect, useState } from "react";
import Main from '../../components/Invoices/MainInvoice';
import { create, remove, search, update } from '../../services/invoice';

export default function Invoice({ setTitle }) {
  useEffect(() => { setTitle('Draco - Hóa Đơn Nhập'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    
  });
  const [data, setData] = useState();

  // Get data
  useEffect(() => {
    searchData(optionSearch)
  }, [optionSearch]);

  const searchData = (option) => {
    search(option).then((res) => setData(res)).catch((err) => console.log(err.message));
  }

  const handlePost = (option, action) => {
    if (option)
    {
      switch (action) {
        case 0:
          return create(option);
          // break;
        case 1:
          return update(option);
          // break;
        case 2:
          return remove(option);
          // break;
        default:
          break;
      }
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <Main data={data} setData={setData} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
