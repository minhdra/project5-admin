export const formatNumberPrice = (text, bonus) => {
  let t = text.replace(/[^0-9]/g, '');
  if (bonus) t = Number(t) + Number(t) * 0.2 + ''; 
  t = t.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return t;
}

export const formatOnlyNumber = (text) => {
  let t = text.replace(/[^0-9]/g, '');
  t = (Number(t) < 0 ? - Number(t) : Number(t)) + '';
  return t;
}
