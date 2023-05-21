import instance from './axios';

export const search = async (data) => (await instance.post('/navigation/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/navigation/getById/' + id)).data;

export const remove = async (data) => (await instance.post('/navigation/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/navigation/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/navigation/create', {
  ...data
}));
