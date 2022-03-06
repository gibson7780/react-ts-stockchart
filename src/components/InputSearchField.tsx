import React from 'react';
import styled from 'styled-components';

interface PropsType {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  errorMessage: string;
}
const InputSearchField = ({
  handleInputChange,
  handleButtonClick,
  errorMessage,
}: PropsType) => (
  <LabelSearchWrap>
    {errorMessage && <SpanErrorMsg>{errorMessage}</SpanErrorMsg>}
    <input type="text" onChange={handleInputChange} />
    <button type="button" onClick={handleButtonClick}>
      搜尋
    </button>
  </LabelSearchWrap>
);

export default InputSearchField;

const LabelSearchWrap = styled.label`
  margin-left: auto;
  display: block;
  width: fit-content;
`;
const SpanErrorMsg = styled.label`
  color: red;
  padding: 0 10px;
`;
