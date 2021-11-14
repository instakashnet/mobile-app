import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ExchangeScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingHorizontal: 30,
  },
})``;

export const ExchangeWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  width: ${Dimensions.get("window").width}px;
`;

export const ExchangeHeader = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brand.primary, theme.colors.brand.tertiary],
}))`
  width: 100%;
  height: 85px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[5]};
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Type = styled.Text`
  color: ${({ theme }) => theme.colors.ui.secondary};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const RatesWrapper = styled.View`
  background-color: #fff;
  border-radius: 4px;
  flex-direction: row;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
`;

export const RateBox = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[6]};
  padding-vertical: ${({ theme }) => theme.space[4]};
  align-items: center;
`;

export const Caption = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text.title};
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-align: center;
`;

export const BorderLine = styled.View`
  height: 100%;
  width: 2px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.button};
  margin-top: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.text.title};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const FormWrapper = styled.View`
  width: 100%;
`;
