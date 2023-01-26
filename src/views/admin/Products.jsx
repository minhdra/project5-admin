import React, { useEffect, useState } from "react";
import MainProduct from '../../components/Products/MainProduct';
import { create, remove, search, update } from '../../services/product';

export default function Products({ setTitle }) {
  useEffect(() => { setTitle('Draco - Products'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    product_name: '',
    origin: '',
    material: '',
    style: '',
  });
  const [data, setData] = useState();
  // 

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
      <MainProduct data={data} setData={setData} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
