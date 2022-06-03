import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import styled from "styled-components/native";

export const Header = styled.View`
  padding-vertical: ${({ theme }) => theme.space[4]};
  padding-horizontal: ${({ theme }) => theme.space[6]};
  min-height: 100px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: ${Dimensions.get("window").width}px;
`;

export const NotificationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-color: ${({ theme }) => theme.colors.text.inactive};
  border-bottom-width: 1px;
  padding: ${({ theme }) => theme.space[4]};
  width: 100%;
`;

export const NotificationLabel = styled.View`
  align-items: flex-start;
  width: 100%;
  padding-left: 15px;
  margin-top: 25px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingBottom: 30,
  },
})``;

export const RightArrow = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 18,
  color: theme.colors.brand.primary,
  name: "arrow-forward-ios",
}))``;

export const NavItem = styled(TouchableRipple)`
  background-color: #fff;
  width: 100%;
`;

export const InputWrapper = styled.View`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.space[5]};
`;
