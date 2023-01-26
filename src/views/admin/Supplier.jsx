import React, { useEffect, useState } from "react";
import Main from '../../components/Suppliers/MainSupplier';
import { create, remove, search, update } from '../../services/supplier';

export default function Supplier({ setTitle }) {
  useEffect(() => { setTitle('Draco - Nhà Cung Cấp'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    supplier_name: '',
    phone: '',
    email: '',
    address: '',
    page: 1,
    pageSize: 10,
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
