import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const AccountsWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[5]};
  width: ${Dimensions.get("window").width}px;
  margin-top: ${({ theme }) => theme.space[6]};
`;
