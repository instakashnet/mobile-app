import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const Accountscroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingHorizontal: 30,
  },
})``;

export const AccountsWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[5]};
  width: ${Dimensions.get("window").width}px;
  margin-top: ${({ theme }) => theme.space[6]};
`;
