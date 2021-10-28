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
  margin-top: ${({ theme }) => theme.space[5]};
`;

export const AccountCard = styled.View`
  border-radius: 10px;
  background-color: #fff;
  width: 90%;
  padding: ${({ theme }) => theme.space[3]};
  margin-vertical: ${({ theme }) => theme.space[3]};
  min-height: 100px;
`;

export const BankIcon = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: ${({ bankName }) => (bankName === "bbva" ? "40px" : "27px")};
  height: 27px;
  margin-right: ${({ theme }) => theme.space[2]};
`;
