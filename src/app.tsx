import React, { useState, useEffect } from 'react';
import { getStockData } from './controllers/stockController';

import StockChart2 from './components/StockChart';
import InputSearchField from './components/InputSearchField';

import { convertChartData, convertChartInfo } from './utils/stockChartModel';

const DEFAULT_SEARCH_WORD = 'MSFT';

const App = () => {
  const [myChartData, setMyChartData] = useState<
    ChartApiResponse | undefined
  >();
  const [stockData, setStockData] = useState<ChartType[] | undefined>();
  const [stockInfo, setStockInfo] = useState<ChartInfoType | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchWords, setSearchWords] = useState<string>(DEFAULT_SEARCH_WORD);

  const fetchData = (): void => {
    const params: CustomStockParams = {
      symbol: searchWords,
    };
    getStockData(params).then((res) => {
      if (res.error === 429) {
        setErrorMessage('查詢太頻繁');
      } else if (res.error || res['Error Message']) {
        setErrorMessage('無資料');
      } else {
        setMyChartData(res);
        setErrorMessage('');
      }
    });
  };

  const handleQuery = (): void => {
    if (searchWords) {
      fetchData();
    } else {
      setErrorMessage('請輸入條件');
    }
  };

  const handleSearchWords = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchWords(e.currentTarget.value);
  };

  useEffect(() => {
    fetchData();
    setSearchWords('');
  }, []);

  useEffect(() => {
    if (myChartData) {
      setStockData(convertChartData(myChartData[`Time Series (Daily)`]));
      setStockInfo(convertChartInfo(myChartData[`Meta Data`]));
    }
  }, [myChartData]);

  return (
    <>
      <InputSearchField
        handleInputChange={handleSearchWords}
        handleButtonClick={handleQuery}
        errorMessage={errorMessage}
      />
      {stockData && stockInfo && (
        <StockChart2 stockInfo={stockInfo} chartData={stockData} />
      )}
    </>
  );
};

export default App;

interface ChartApiResponse {
  'Meta Data': object;
  'Time Series (Daily)': object;
}
interface ChartType {
  Close: number;
  Date: Date;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}
interface ChartInfoType {
  Information: string;
  Symbol: string;
  'Last Refreshed': string;
  'Output Size': string;
  'Time Zone': string;
}

interface CustomStockParams {
  symbol: string;
}
