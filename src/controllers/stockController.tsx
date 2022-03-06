import axios from './axios';

interface StockParams {
  interval: string;
  function: string;
  symbol: string;
  datatype: string;
  output_size: string;
}

export const getStockData = async (params: any) => {
  try {
    const customparams: StockParams = {
      interval: '5min',
      function: 'TIME_SERIES_DAILY',
      datatype: 'json',
      output_size: 'compact',
      ...params,
    };
    return await axios
      .get('/query', { params: customparams })
      .then((res) => res.data);
  } catch (err) {
    const error: any = err;
    console.log('error', error);
    return { error: error.response.status };
  }
};
