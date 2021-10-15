import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

export const AuthWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  width: ${Dimensions.get("window").width}px;
`;

export const SplashWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;
`;

export const SlideImage = styled.Image`
  height: 170px;
  resize-mode: contain;
`;

export const SlideView = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  height: ${(Dimensions.get("window").width * 3) / 4}px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Slider = styled(Carousel).attrs(({ theme }) => ({
  containerCustomStyle: {
    width: theme.sizes[3],
    marginBottom: theme.space[4],
  },
}));

export const AuthLinkWrapper = styled.View`
  margin-vertical: ${({ theme }) => theme.space[4]}
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
