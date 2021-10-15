import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";

const SafeAreaComponent = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`;

export const SafeArea = ({ children }) => {
  return <SafeAreaComponent>{children}</SafeAreaComponent>;
};
