import React, { useCallback, useEffect, useState } from 'react';

// components

import CardSettings from '../../components/Cards/CardSettings.jsx';
import { getByUserId, update } from '../../services/staff';
export default function Settings({ setTitle }) {
  const token = window.sessionStorage.getItem('USER_TOKEN');
  useEffect(() => {
    setTitle('Draco - Profile');
  }, [setTitle]);

  const [userId, setUserId] = useState(() =>
    window.sessionStorage.getItem('uuid')
  );

  const [user, setUser] = useState();

  const getUser = useCallback((id) => {
    getByUserId(id, token)
      .then((res) => setUser(res))
      .catch((err) => console.log(err.message));
  }, [token]);

  useEffect(() => {
    getUser(userId);
  }, [userId, getUser]);

  const updateUser = (option) => {
    return update(option, token).then((res) => getUser(userId));
  };

  return (
    <>
      <div className='flex flex-wrap py-4'>
        <CardSettings user={user} updateUser={updateUser} setUserId={setUserId} />
      </div>
    </>
  );
}
