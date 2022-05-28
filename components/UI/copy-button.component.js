import React from "react";
import styled from "styled-components/native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

const TouchedButton = styled.TouchableOpacity`
  background-color: #e1f2ec;
  padding: ${({ theme }) => theme.space[2]};
  margin-horizontal: ${({ theme }) => theme.space[1]};
  border-radius: 25px;
`;

export const CopyButton = ({ text }) => {
  const copyToClipboard = () => Clipboard.setString(text);

  return (
    <TouchedButton onPress={copyToClipboard}>
      <Ionicons name="ios-copy-outline" size={15} color="#0D8284" />
    </TouchedButton>
  );
};
