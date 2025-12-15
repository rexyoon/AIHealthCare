export const getAccessToken = () => {
  const t = localStorage.getItem('accessToken');
  return t && t !== 'null' && t !== 'undefined' ? t : null;
};
