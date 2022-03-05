import React from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import styled from 'styled-components';

IgrFinancialChartModule.register();

export default ({ stockInfo, chartData }: ComponentPropsType) => {
  const { Symbol } = stockInfo as ChartInfoType;

  return (
    <DivWeapper>
      <DivContainer>
        <IgrFinancialChart
          width="100%"
          height="90%"
          isToolbarVisible={false}
          chartType="Candle"
          chartTitle={Symbol}
          titleAlignment="Left"
          titleLeftMargin="25"
          titleTopMargin="10"
          titleBottomMargin="10"
          subtitleAlignment="Left"
          subtitleLeftMargin="25"
          subtitleTopMargin="5"
          subtitleBottomMargin="10"
          yAxisLabelLocation="OutsideLeft"
          yAxisMode="Numeric"
          yAxisTitle="(元)"
          yAxisTitleLeftMargin="10"
          yAxisTitleRightMargin="5"
          yAxisLabelLeftMargin="0"
          zoomSliderType="None"
          dataSource={chartData}
          volumeType="Area"
        />
      </DivContainer>
    </DivWeapper>
  );
};

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
interface ComponentPropsType {
  chartData: ChartType[] | undefined;
  stockInfo: ChartInfoType | undefined;
}

const DivWeapper = styled.div`
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  width: 100%;
  height: 600px;
  box-sizing: border-box;
`;
const DivContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  align-items: stretch;
  align-self: stretch;
  overflow-y: hidden;
  overflow-x: hidden;
  min-width: 200px;
  height: 100%;
  width: 100%;
  padding: 0rem;
  margin: 0rem;
  position: relative;
  max-width: none;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Titillium Web', Verdana, Tahoma, sans-serif;
  box-sizing: border-box;
`;
