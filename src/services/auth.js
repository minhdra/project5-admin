import instance from './axios';

export const search = async (data, token) =>
  (
    await instance.post(
      '/user/search',
      {
        ...data,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
  ).data;

export const getById = async (id, token) =>
  (
    await instance.get('/user/' + id, {
      headers: {
        'auth-token': token,
      },
    })
  ).data;

export const register = async (data) =>
  await instance.post('/user/register', {
    ...data,
  });

export const login = async (data) =>
  await instance.post('/user/login', {
    ...data,
  });

export const changePassword = async (data, token) =>
  await instance.post(
    '/user/change-password',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );

export const remove = async (data, token) =>
  await instance.post(
    '/user/delete',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );

export const update = async (data, token) =>
  await instance.post(
    '/user/update',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );
