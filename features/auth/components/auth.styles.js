import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

export const AuthScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingVertical: 25,
  },
})``;

export const AuthWrapper = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  padding-vertical: ${({ theme }) => theme.space[3]};
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
