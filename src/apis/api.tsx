import axios from './';

export const getStockData = async (params: any) => {
  try {
    return await axios
      .get('/query', { params: params })
      .then((res) => res.data);
  } catch (error) {
    console.log('err', error);
    return { error: 'error' };
  }
};
