import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../../../theme";

export const HomeWrapper = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingVertical: 25,
  },
}))``;

export const WelcomeCard = styled.View`
  min-height: 185px;
  background-color: #fffbdb;
  elevation: 7;
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[5]};
  justify-content: center;
  border-radius: 10px;
  width: ${Dimensions.get("window").width / 1.1}px;
  margin-horizontal: ${({ theme }) => theme.space[3]};
  position: relative;
  overflow: hidden;
`;

export const ShadowCard = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  width: 100%;
`;

export const InfoCard = styled.View`
  min-height: 185px;
  background-color: #fff;
  elevation: 7;
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[5]};
  justify-content: center;
  border-radius: 10px;
  width: ${Dimensions.get("window").width / 1.1}px;
  margin-horizontal: ${({ theme }) => theme.space[3]};
  position: relative;
  overflow: hidden;
`;

export const CardContent = styled.View`
  max-width: 62%;
`;

export const ImgWrapper = styled.View`
  position: absolute;
  bottom: 15px;
  right: 10px;
`;

export const Shape1Bg = styled.ImageBackground.attrs({
  resizeMode: "cover",
  source: require("../../../assets/bg/shape1.png"),
})`
  width: 100%;
  height: 35%;
  flex: 1;
  position: absolute;
  right: 0;
  top: 126px;
`;

export const Button = styled(PaperButton).attrs({
  labelStyle: {
    color: theme.colors.text.body,
    fontSize: 14,
    fontFamily: theme.fonts.button,
    letterSpacing: 0,
  },
  contentStyle: {
    height: 50,
  },
  color: theme.colors.buttons.active,
  mode: "contained",
  uppercase: false,
})`
  width: 100%;
  max-width: 130px;
  box-shadow: 5px 10px 17px rgba(0, 0, 0, 0.1);
  elevation: 5;
`;
