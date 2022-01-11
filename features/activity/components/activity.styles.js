import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const ActivityScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingHorizontal: 25,
  },
})``;

export const ActivityWrapper = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.space[3]};
  width: ${Dimensions.get("window").width}px;
`;

export const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const OrdersWrapper = styled.View`
  align-items: center;
  width: 100%;
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const OrderCard = styled.TouchableOpacity`
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[4]};
  margin-vertical: ${({ theme }) => theme.space[2]};
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 3;
`;

export const Card = styled.View`
  padding: ${({ theme }) => theme.space[4]};
  margin-vertical: ${({ theme }) => theme.space[2]};
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.View`
  border-radius: 5px;
  background-color: ${({ color }) => color};
  padding: 8px;
`;

export const Status = styled.Text.attrs({
  allowFontScaling: false,
  adjustsFontSizeToFit: true,
  numberOfLines: 1,
})`
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.button};
  text-transform: lowercase;
  color: #fff;
`;

export const ShowButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.brand.primary};
  padding-bottom: ${({ theme }) => theme.space[1]};
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-vertical: ${({ theme }) => theme.space[3]};
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.brand.primary};
`;

export const BankLogo = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 85px;
  height: 27px;
`;
