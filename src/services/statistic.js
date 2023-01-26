import instance from './axios';

export const statisticUserOfMonth = async (data) => (await instance.post('/statistic/users-of-month', {
  ...data
})).data;

export const calculateTotalOfMonth = async (data) => (await instance.post('/statistic/total-of-month', {
  ...data
})).data;

export const calculateTotalOfAllTime = async (data) => (await instance.post('/statistic/total-of-all', {
  ...data
})).data;

export const statisticOrdersDeliveredOfMonth = async (data) => (await instance.post('/statistic/orders-delivered-of-month', {
  ...data
})).data;

export const statisticOrdersUnverified = async (data) => (await instance.post('/statistic/orders-unverified', {
  ...data
})).data;

export const statisticProducts = async (data) => (await instance.post('/statistic/count-products', {
  ...data
})).data;
