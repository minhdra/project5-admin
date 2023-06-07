import instance from './axios';

export const sendContact = async (data) => (await instance.post('/email/send-contact', {
  ...data
}));

export const sendSubscribe = async (data) => (await instance.post('/email/send-subscribe', {
  ...data
}));

export const sendOrder = async (data) => (await instance.post('/email/send-order', {
  ...data
}));

export const sendChangeStatusOrder = async (data) => (await instance.post('/email/send-status-order', {
  ...data
}));

export const verifyAccount = async (data) => (await instance.post('/email/verify-account', {
  ...data
}));

export const sendResetPassword = async (data) => (await instance.post('/email/send-reset-password', {
  ...data
}));

