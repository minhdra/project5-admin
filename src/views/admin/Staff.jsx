import React, { useCallback, useEffect, useState } from 'react';
import Main from '../../components/Staffs/MainStaff';
import { register } from '../../services/auth';
import { remove, search, update } from '../../services/staff';

export default function Staffs({ setTitle }) {
  const token = window.sessionStorage.getItem('USER_TOKEN');
  useEffect(() => {
    setTitle('Draco - Nhân Viên');
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
          return update(option, token).then((res) => searchData(optionSearch));
        // break;
        case 2:
          return remove(option, token).then((res) => searchData(optionSearch));
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
        optionSearch={optionSearch}
        searchData={searchData}
        handlePost={handlePost}
        setOptionSearch={setOptionSearch}
      />
    </div>
  );
}
