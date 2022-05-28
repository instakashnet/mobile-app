import React from "react";
// COMPONENTS
import { CurrencyInput, InputLabel, InputWrapper, Symbol } from "../calculator.styles";

export const Input = ({ label, currency, name, symbol, value, onChange }) => {
  return (
    <InputWrapper>
      <InputLabel>
        {label} {currency}
      </InputLabel>
      <CurrencyInput value={value} keyboardType="number-pad" ignoreNegative={true} delimiter="," minValue={0} separator="." onChangeValue={(value) => onChange(name, value)} />
      <Symbol>{symbol}</Symbol>
    </InputWrapper>
  );
};
