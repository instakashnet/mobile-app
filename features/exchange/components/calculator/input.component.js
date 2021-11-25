import React from "react";

// COMPONENTS
import { InputWrapper, CurrencyLabel, Label, InputLabel, Symbol, CurrencyInput } from "../calculator.styles";

export const Input = ({ label, currency, name, symbol, value, onChange }) => {
  return (
    <InputWrapper>
      <CurrencyLabel>
        <Label>{currency}</Label>
      </CurrencyLabel>
      <CurrencyInput value={value} keyboardType="number-pad" ignoreNegative={true} delimiter="," minValue={0} separator="." onChangeValue={(value) => onChange(name, value)} />
      <InputLabel>{label}</InputLabel>
      <Symbol>{symbol}</Symbol>
    </InputWrapper>
  );
};
