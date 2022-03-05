import React, { useState, useEffect } from 'react';
import { getStockData } from './apis/api';

import StockChart2 from './components/StockChart';
import InputSearchField from './components/InputSearchField';

import styled from 'styled-components';

const DEFAULT_SEARCH_WORD = 'MSFT';

const App = () => {
  const [myChartData, setMyChartData] = useState<
    ChartApiResponse | undefined
  >();
  const [viewData, setViewData] = useState<ChartType[] | undefined>();
  const [stockInfo, setStockInfo] = useState<ChartInfoType | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchWords, setSearchWords] = useState<string>(DEFAULT_SEARCH_WORD);

  const fetchData = (): void => {
    if (searchWords) {
      const params: StockParams = {
        interval: '5min',
        function: 'TIME_SERIES_DAILY',
        symbol: searchWords,
        datatype: 'json',
        output_size: 'compact',
      };
      getStockData(params).then((res) => {
        if (res.error || res['Error Message']) {
          setErrorMessage('查無資料');
        } else {
          setMyChartData(res);
          setErrorMessage('');
        }
      });
    } else {
      setErrorMessage('請輸入查詢條件');
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
    if (typeof myChartData !== 'undefined') {
      const convertChartData = (data: any): ChartType[] => {
        let stockChartData: ChartType[] = [];
        Object.entries(data)
          .slice(0)
          .reverse()
          .map(([key, value]: any) => {
            stockChartData = [
              ...stockChartData,
              {
                Date: new Date(key),
                Open: parseInt(value[`1. open`], 10),
                High: parseInt(value[`2. high`], 10),
                Low: parseInt(value[`3. low`], 10),
                Close: parseInt(value[`4. close`], 10),
                Volume: parseInt(value[`5. volume`], 10),
              },
            ];
          });
        return stockChartData;
      };

      const convertChartInfo = (data: any): ChartInfoType => {
        const originStockInfo: StockInfoType = { ...data };
        const stockInfo: ChartInfoType = {
          Information: originStockInfo[`1. Information`],
          Symbol: originStockInfo[`2. Symbol`],
          'Last Refreshed': originStockInfo[`3. Last Refreshed`],
          'Output Size': originStockInfo[`4. Output Size`],
          'Time Zone': originStockInfo[`5. Time Zone`],
        };
        return stockInfo;
      };

      setViewData(convertChartData(myChartData[`Time Series (Daily)`]));
      setStockInfo(convertChartInfo(myChartData[`Meta Data`]));
    }
  }, [myChartData]);

  return (
    <>
      <LabelSearchWrap>
        {errorMessage && <SpanErrorMsg>{errorMessage}</SpanErrorMsg>}
        <InputSearchField handleChange={handleSearchWords} />
        <button type="button" onClick={() => fetchData()}>
          搜尋
        </button>
      </LabelSearchWrap>

      {viewData && <StockChart2 stockInfo={stockInfo} chartData={viewData} />}
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
interface StockInfoType {
  [propName: string]: string;
}

interface StockParams {
  interval: string;
  function: string;
  symbol: string;
  datatype: string;
  output_size: string;
}

const LabelSearchWrap = styled.label`
  margin-left: auto;
  display: block;
  width: fit-content;
`;
const SpanErrorMsg = styled.label`
  color: red;
  padding: 0 10px;
`;
