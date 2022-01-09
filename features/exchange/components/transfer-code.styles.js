import styled from "styled-components/native";
import { Snackbar } from "react-native-paper";

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.subtitle};
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const BankImage = styled.Image`
  width: 70px;
  height: 30px;
  margin-right: ${({ theme }) => theme.space[2]};
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TransferWrapper = styled.View`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.space[3]};
  align-items: center;
`;

export const InfoBox = styled.View`
  align-items: center;
`;

export const TransferCard = styled.View`
  elevation: 7;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

export const Info = styled.Text`
  color: ${({ theme }) => theme.colors.brand.primary};
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const ShadowCard = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  width: 100%;
`;

export const Snack = styled(Snackbar).attrs({
  wrapperStyle: {
    position: "relative",
  },
})`
  width: 100%;
  margin: 0;
  background-color: rgb(2, 109, 167);
`;
