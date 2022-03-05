import React from 'react';

interface PropsType {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputSearchField = ({ handleChange }: PropsType) => {
  return <input type="text" onChange={handleChange} />;
};

export default InputSearchField;
