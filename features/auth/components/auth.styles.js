import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";

export const AuthScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingHorizontal: 15,
    marginTop: 10,
    width: Dimensions.get("window").width,
    maxWidth: 400,
  },
})``;

export const AuthWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[4]};
  width: ${Dimensions.get("window").width}px;
  max-width: 400px;
`;

export const SplashWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;
`;

export const Slider = styled(Carousel).attrs(({ theme }) => ({
  containerCustomStyle: {
    width: theme.sizes[3],
    marginBottom: theme.space[4],
  },
}));

export const AuthLinkWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.space[4]}
  margin-top: ${({ theme }) => theme.space[2]}
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const AuthLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.ui.border};
  width: 100px;
`;

export const OtpWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const RecoverInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const RecoverInput = styled(TextInput).attrs(({ theme }) => ({
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

export const RecoverButton = styled(Button).attrs(({ theme }) => ({
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
