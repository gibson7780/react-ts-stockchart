interface ChartType {
  Close: number;
  Date: Date;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}

export const convertChartData = (data: any): ChartType[] => {
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

interface StockInfoType {
  [propName: string]: string;
}
interface ChartInfoType {
  Information: string;
  Symbol: string;
  'Last Refreshed': string;
  'Output Size': string;
  'Time Zone': string;
}

export const convertChartInfo = (data: any): ChartInfoType => {
  const originStockInfo: StockInfoType = { ...data };
  const stockInfo: ChartInfoType = {
    Information: originStockInfo[`1. Information`],
    Symbol: originStockInfo[`2. Symbol`].toUpperCase(),
    'Last Refreshed': originStockInfo[`3. Last Refreshed`],
    'Output Size': originStockInfo[`4. Output Size`],
    'Time Zone': originStockInfo[`5. Time Zone`],
  };
  return stockInfo;
};
