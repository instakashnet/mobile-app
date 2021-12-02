import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import InputCurrency from "react-native-currency-input";
import CountDown from "react-native-countdown-component";

export const CalculatorWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 7;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const CurrencyLabel = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.primary};
  color: #fff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-vertical: 24px;
  padding-horizontal: 15px;
  align-items: center;
  flex: 0.35;
`;

export const Label = styled.Text.attrs({
  allowFontScaling: false,
})`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
`;

export const CurrencyInput = styled(InputCurrency)`
  flex: 0.65;
  padding-vertical: 22px;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  padding-left: 64.5px;
  background-color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: ${({ theme }) => theme.colors.text.title};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-align: right;
`;

export const Symbol = styled.Text.attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.text.title};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.large};
  position: absolute;
  left: 120px;
  top: 30%;
`;

export const InputLabel = styled.Text.attrs({
  allowFontScaling: false,
})`
  position: absolute;
  right: 25px;
  top: 7px;
  color: ${({ theme }) => theme.colors.text.title};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

export const CouponInputWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  height: 50px;
`;

export const CouponInput = styled(TextInput).attrs(({ theme }) => ({
  theme: { ...theme, colors: { primary: theme.colors.brand.primary, error: theme.colors.ui.error } },
  mode: "outlined",
  outlineColor: theme.colors.ui.border,
  dense: true,
  allowFontScaling: false,
}))`
  height: 53px;
  flex: 0.85;
  justify-content: center;
  padding: 0px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  background-color: #fff;
`;

export const CouponButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
  mode: "contained",
  uppercase: false,
  allowFontScaling: false,
  contentStyle: {
    height: 55,
  },
}))`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  flex: 0.15;
  margin-bottom: 0px;
`;

export const CouponWrapper = styled.View`
  background-color: #fff;
  width: 100%;
  flex-direction: row;
  border-radius: 4px;
  border-width: 1px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 7;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.brand.primary};
  padding: ${({ theme }) => theme.space[2]};
  justify-content: space-between;
  align-items: center;
`;

export const CouponText = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.title};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary};
`;

export const TimerWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space[1]};
  width: 100%;
`;

export const Timer = styled(CountDown).attrs(({ theme }) => ({
  digitStyle: { backgroundColor: "transparent", width: 32 },
  digitTxtStyle: { color: theme.colors.text.body, fontFamily: theme.fonts.button, color: theme.colors.brand.primary },
}))``;
