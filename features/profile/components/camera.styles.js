import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ActivityIndicator } from "react-native-paper";

export const NoCameraWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
`;

export const CameraWrapper = styled.View`
  flex: 1;
  width: ${Dimensions.get("window").width}px;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.space[4]};
  padding-vertical: ${({ theme }) => theme.space[2]};
`;

export const CameraItemsWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CameraSquare = styled.View`
  width: ${Dimensions.get("window").width / 1.1}px;
  height: 215px;
  border-width: 6px;
  border-color: #fff;
  border-radius: 10px;
  position: relative;
  margin-vertical: ${({ theme }) => theme.space[3]};
  align-items: center;
  justify-content: center;
`;

export const InfoWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  min-width: ${Dimensions.get("window").width / 1.5}px;
`;

export const LoaderWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[4]};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const CameraLoader = styled(ActivityIndicator).attrs({
  size: 45,
  animating: true,
  color: "#FFF",
})`
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[2]};
  margin-horizontal: ${({ theme }) => theme.space[2]};
  align-items: center;
`;
