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
  align-items: center;
  justify-content: space-between;
`;

export const CameraOverlay = styled.View`
  width: ${Dimensions.get("window").width}px;
  flex: 0.33;
  background-color: rgba(0, 0, 0, 0.75);
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space[3]};
`;

export const CameraSquare = styled.View`
  width: ${Dimensions.get("window").width / 1.07}px;
  border-width: 4px;
  border-color: #fff;
  flex: 0.34;
`;

export const Title = styled(Text)`
  color: #fff;
  margin-top: auto;
`;

export const Info = styled(Text)`
  color: #fff;
`;

export const CameraButton = styled.TouchableOpacity`
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const CameraLoader = styled(ActivityIndicator).attrs({
  size: 80,
  animating: true,
  color: "#FFF",
})`
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[6]};
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[2]};
  margin-horizontal: ${({ theme }) => theme.space[2]};
  align-items: center;
`;
