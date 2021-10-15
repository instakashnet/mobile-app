import React from "react";
import styled from "styled-components";

export const Input = styled.TextInput`
  width: ${({ theme }) => theme.sizes[3]};
  height: ${({ theme }) => theme.sizes[3]};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.ui.border};
  text-align: center;
  margin-horizontal: ${({ theme }) => theme.space[1]};
  background-color: ${({ theme, value }) => (value ? theme.colors.brand.primary : "#dde")};
  border-radius: 50px;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const OtpInput = ({ onCode, value, refCallback, ...rest }) => {
  return <Input value={value} onChangeText={onCode} ref={refCallback} maxLength={1} keyboardType="numeric" {...rest} />;
};
