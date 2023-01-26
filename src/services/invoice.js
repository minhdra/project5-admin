import instance from './axios';

export const search = async (data) => (await instance.post('/invoice/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/invoice/getById/' + id)).data;

export const remove = async (data) => (await instance.post('/invoice/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/invoice/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/invoice/create', {
  ...data
}));
