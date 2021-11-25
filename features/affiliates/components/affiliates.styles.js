import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const AffiliatesWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[6]};
  padding-vertical: ${({ theme }) => theme.space[5]};
  flex: 1;
  align-items: center;
  width: ${Dimensions.get("window").width}px;
`;

export const AffiliatesScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
})``;

export const AffiliateHeader = styled.View`
  padding-vertical: ${({ theme }) => theme.space[4]};
  padding-horizontal: ${({ theme }) => theme.space[6]};
  min-height: 100px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;
`;

export const FormWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[6]};
  width: 100%;
  margin-top: ${({ theme }) => theme.space[6]};
`;

export const CodeWrapper = styled.View`
  width: 100%;
  align-items: center;
  background-color: #fff7b8;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: 10px;
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.brand.primary};
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text.attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.subtitle};
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: ${({ theme }) => theme.space[2]};
  height: 110px;
  width: 125px;
  margin: ${({ theme }) => theme.space[2]};
  align-items: center;
  justify-content: center;
`;

export const Number = styled.Text.attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-family: ${({ theme }) => theme.fonts.subtitle};
`;

export const Subtitle = styled.Text.attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.subtitle};
`;
