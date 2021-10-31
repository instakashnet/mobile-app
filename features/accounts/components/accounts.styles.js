import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const AccountsWrapper = styled.View`
  padding: ${({ theme }) => theme.space[5]};
  width: ${Dimensions.get("window").width}px;
  margin-top: ${({ theme }) => theme.space[3]};
  flex: 0.9;
  justify-content: center;
  align-items: center;
`;

export const AccountCard = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: #fff;
  width: 300px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 7;
  padding: ${({ theme }) => theme.space[4]};
  margin-horizontal: ${({ theme }) => theme.space[3]};
  margin-vertical: ${({ theme }) => theme.space[2]};
  height: 140px;
`;

export const SectionTitle = styled.View`
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 7;
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[4]};
  margin-vertical: ${({ theme }) => theme.space[2]};
`;

export const BankLogo = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 85px;
  height: 27px;
`;

export const DetailsCard = styled.View`
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 7;
  padding: ${({ theme }) => theme.space[4]};
  margin-horizontal: ${({ theme }) => theme.space[3]};
  margin-vertical: ${({ theme }) => theme.space[2]};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.subtitle};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.body};
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text.inactive};
`;
