import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardAware = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    width: Dimensions.get("window").width,
    padding: 20,
    alignItems: "center",
  },
})``;

export const KeyboardScrollAware = ({ children }) => {
  return <KeyboardAware>{children}</KeyboardAware>;
};
