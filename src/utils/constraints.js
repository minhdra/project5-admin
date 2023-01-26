import { common } from '../common/common';

export const getStatusOrder = (statusDelivery) => {
  return common.orderStatuses[statusDelivery];
};

export const convertObjectToArray = (obj) => {
  const array = [];
  Object.keys(obj).forEach(function(key, index) {
    array.push(obj[key]);
  });
  
  return array;
}