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
  position: relative;
`;

export const CameraOverlay = styled.View`
  width: ${Dimensions.get("window").width}px;
  flex: 0.33;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const CameraSquare = styled.View`
  width: ${Dimensions.get("window").width / 1.07}px;
  border-width: 4px;
  border-color: #fff;
  flex: 0.34;
`;

export const Title = styled(Text)`
  color: #fff;
  position: absolute;
  left: ${Dimensions.get("window").width / 2.75}px;
  top: 28%;
  elevation: 1;
`;

export const Info = styled(Text)`
  color: #fff;
  position: absolute;
  bottom: 28%;
  left: ${Dimensions.get("window").width / 8.5}px;
`;

export const CameraButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  left: ${Dimensions.get("window").width / 2.75}px;
`;

export const CameraLoader = styled(ActivityIndicator).attrs({
  size: 90,
  animating: true,
  color: "#FFF",
})`
  position: absolute;
  bottom: 40px;
  left: ${Dimensions.get("window").width / 2.75}px;
`;

export const ButtonsWrapper = styled.View`
  position: absolute;
  bottom: 40px;
  left: ${Dimensions.get("window").width / 16}px;
  width: 100%;
`;
