import React, { useEffect, useState } from "react";
import Main from '../../components/Navigation/MainNavigation';
import { create, remove, search, update } from '../../services/navigation';

export default function Navigation({ setTitle }) {
  useEffect(() => { setTitle('Draco - Pages'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    title: '',
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
