import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";

const LoaderWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(13, 130, 132, 0.8);
  z-index: 100;
  elevation: 8;
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <ActivityIndicator color="#FFF" animating size={50} />
    </LoaderWrapper>
  );
};
