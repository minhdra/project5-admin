import React, { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router';
import Main from '../../components/ImportProducts/MainImport';
import { update as updateProduct, getByPath } from '../../services/product';
import { create as createInvoice } from '../../services/invoice';

export default function ImportProduct({ setTitle }) {
  useEffect(() => { setTitle('Draco - Nhập Sản Phẩm'); }, [setTitle]);

  const {slug} = useParams();

  const [data, setData] = useState();

  const searchData = useCallback(() => {
    getByPath(slug).then((res) => setData(res)).catch((err) => console.log(err.message));
  }, [slug]);

  useEffect(() => {
    searchData()
  }, [searchData]);

  const handlePost = (option, action) => {
    if (option)
    {
      switch (action)
      {
        case 0:
          return createInvoice(option);
          // break;
        case 1:
          return updateProduct(option).then(res => searchData());
          // break;
        default:
          // break;
      }
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <Main data={data} searchData={searchData} handlePost={handlePost} />
    </div>
  );
}
