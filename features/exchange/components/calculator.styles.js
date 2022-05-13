import CountDown from "react-native-countdown-component";
import InputCurrency from "react-native-currency-input";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

export const CalculatorWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #e9f6f6;
  border-radius: 10px;
`;

export const CurrencyInput = styled(InputCurrency)`
  width: 70%;
  padding-bottom: 16px;
  padding-top: 24px;
  padding-horizontal: ${({ theme }) => theme.space[3]};
  padding-right: 55px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: ${({ theme }) => theme.colors.text.title};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const Symbol = styled.Text.attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.text.title};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  position: absolute;
  right: 6%;
  top: 16px;
`;

export const InputLabel = styled.Text.attrs({
  allowFontScaling: false,
})`
  position: absolute;
  left: 15px;
  top: 7px;
  color: ${({ theme }) => theme.colors.text.title};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.button};
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
  height: 50px;
  flex: 1;
  justify-content: center;
  padding: 0px;
  font-size: ${({ theme }) => theme.fontSizes.button};
  background-color: #fff;
`;

export const CouponButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.space[1]};
  position: absolute;
  right: 7px;
  bottom: 7px;
  margin-vertical: 5px;
  border-left-width: 1px;
  border-left-color: #676767;
  z-index: 10;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CouponWrapper = styled.View`
  background-color: #fff;
  width: 100%;
  flex-direction: row;
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.brand.primary};
  padding: ${({ theme }) => theme.space[2]};
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const CouponText = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary};
`;

export const TimerInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space[1]};
  width: 100%;
`;

export const TimerWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Timer = styled(CountDown).attrs(({ theme }) => ({
  digitStyle: { backgroundColor: "transparent", width: 26 },
  digitTxtStyle: { color: theme.colors.text.body, fontFamily: theme.fonts.title, color: theme.colors.text.body, fontSize: 16 },
}))``;
