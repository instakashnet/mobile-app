import styled from "styled-components/native";
import { FlatList } from "react-native";

export const AccountWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 0px 3px;
  shadow-radius: 5px;
  padding-horizontal: ${({ theme }) => theme.space[4]};
  padding-vertical: ${({ theme }) => theme.space[3]};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.ui.border};
`;

export const AccountSelect = styled.View`
  width: 100%;
  height: 50px;
  background-color: #fff;
  padding-horizontal: ${({ theme }) => theme.space[4]};
  border-radius: 3px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 2px 6px;
  shadow-radius: 5px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: transparent;
`;

export const AccountsFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    minHeight: 200,
  },
})`
  flex-grow: 0;
`;

export const AddWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 6px;
  shadow-radius: 5px;
  padding-horizontal: ${({ theme }) => theme.space[4]};
  padding-vertical: ${({ theme }) => theme.space[2]};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Radio = styled.View`
  width: 21px;
  height: 21px;
  border-radius: 50px;
  border-width: 2px;
  margin-right: ${({ theme }) => theme.space[1]}
  border-color: ${({ theme }) => theme.colors.brand.primary};
`;

export const BankDescription = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BankIcon = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: ${({ bankName }) => (bankName === "bbva" ? "46px" : "22px")};
  height: 22px;
  margin-right: ${({ theme }) => theme.space[2]};
`;

export const AccountPicker = styled.View`
  align-items: flex-start;
  width: 100%;
`;
