import React, { useCallback, useEffect, useState } from 'react';
import Main from '../../components/Customers/MainCustomer';
import { register } from '../../services/auth';
import { remove, search, update } from '../../services/customer';

export default function Customers({ setTitle }) {
  const token = window.sessionStorage.getItem('USER_TOKEN');
  useEffect(() => {
    setTitle('Draco - Khách Hàng');
  }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [data, setData] = useState();

  // Get data

  const searchData = useCallback(
    (option) => {
      search(option, token)
        .then((res) => setData(res))
        .catch((err) => console.log(err.message));
    },
    [token]
  );

  useEffect(() => {
    searchData(optionSearch);
  }, [optionSearch, searchData]);

  const handlePost = (option, action) => {
    if (option) {
      switch (action) {
        case 0:
          return register(option).then((res) =>
            setTimeout(() => searchData(optionSearch), 1000)
          );

        // break;
        case 1:
          return update(option, token);
        // break;
        case 2:
          return remove(option, token);
        // break;
        default:
          break;
      }
    }
  };

  return (
    <div className='min-h-screen p-4'>
      <Main
        data={data}
        setData={setData}
        optionSearch={optionSearch}
        searchData={searchData}
        handlePost={handlePost}
        setOptionSearch={setOptionSearch}
      />
    </div>
  );
}
