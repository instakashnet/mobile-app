import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ExchangeScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
})``;

export const ExchangeWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  padding-vertical: ${({ theme }) => theme.space[2]};
  width: ${Dimensions.get("window").width}px;
`;

export const ExchangeForm = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[3]};
  align-items: center;
  width: 100%;
`;

export const ExchangeHeader = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brand.primary, theme.colors.brand.tertiary],
}))`
  width: 100%;
  min-height: 60px;
  max-height: 80px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[4]};
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  align-items: center;
  max-width: 50%;
`;

export const Type = styled.Text.attrs({
  allowFontScaling: false,
})`
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

export const OldRatesWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const RateBox = styled.View`
  padding: ${({ theme }) => theme.space[4]};
  align-items: center;
`;

export const Caption = styled.Text.attrs({
  allowFontScaling: false,
})`
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

export const Price = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.button};
  margin-top: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.text.title};
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

export const FormWrapper = styled.View`
  width: 100%;
  align-items: center;
`;
