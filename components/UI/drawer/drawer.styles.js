import styled from "styled-components/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { DrawerItem } from "@react-navigation/drawer";
import { Dimensions } from "react-native";

export const Header = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[4]};
  padding-vertical: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-left: ${({ theme }) => theme.space[3]};
`;

export const Icon = styled(FontAwesome5).attrs({
  size: 17,
})``;

export const RightArrow = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 18,
  color: theme.colors.brand.primary,
  name: "arrow-forward-ios",
}))`
  position: absolute;
  right: 0;
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${Dimensions.get("window").width / 1.25}px;
  margin-left: -15px;
`;

export const Item = styled(DrawerItem).attrs(({ theme }) => ({
  activeTintColor: theme.colors.brand.primary,
  inactiveTintColor: theme.colors.text.body,
  labelStyle: { marginRight: 0, marginLeft: 10 },
}))`
  position: relative;
`;
