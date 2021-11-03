import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

export const InfoWrapper = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  flex: 0.4;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HeaderProfile = styled.View`
  padding-vertical: ${({ theme }) => theme.space[4]};
  padding-horizontal: ${({ theme }) => theme.space[6]};
  min-height: 100px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;
`;

export const NavItem = styled(TouchableRipple)`
  background-color: #fff;
  border-color: ${({ theme }) => theme.colors.text.inactive};
  border-bottom-width: 1px;
  padding: ${({ theme }) => theme.space[4]};
  width: 100%;
`;

export const InfoItem = styled.View`
  background-color: #fff;
  border-color: ${({ theme }) => theme.colors.text.inactive};
  border-bottom-width: 1px;
  padding-vertical: ${({ theme }) => theme.space[3]};
  padding-left: ${({ theme }) => theme.space[6]};
  padding-right: ${({ theme }) => theme.space[4]};
  width: 100%;
`;

export const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RightArrow = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 18,
  color: theme.colors.brand.primary,
  name: "arrow-forward-ios",
}))``;

export const FormWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[6]};
  width: 100%;
  margin-top: ${({ theme }) => theme.space[6]};
`;
