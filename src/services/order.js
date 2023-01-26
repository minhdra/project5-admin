import instance from './axios';

export const search = async (data) => (await instance.post('/order/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/order/getById/' + id)).data;

export const remove = async (data) => (await instance.post('/order/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/order/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/order/create', {
  ...data
}));
