import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const NoCameraWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
`;

export const CameraOverlay = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  border-color: rgba(0, 0, 0, 0.65);

  border-left-width: ${({ preview }) => (preview ? Dimensions.get("window").width : Dimensions.get("window").width / 7.3)}px;
  border-right-width: ${({ preview }) => (preview ? Dimensions.get("window").width : Dimensions.get("window").width / 7.3)}px;
  border-top-width: ${({ preview }) => (preview ? Dimensions.get("window").width : Dimensions.get("window").width / 4.2)}px;
  border-bottom-width: ${({ preview }) => (preview ? Dimensions.get("window").width : Dimensions.get("window").width / 1.35)}px;
`;

export const CameraSquare = styled.View`
  width: ${Dimensions.get("window").width / 1.35}px;
  height: ${Dimensions.get("window").height / 1.8}px;
  border-radius: 10px;
  border-width: 6px;
  border-color: #fff;
  background-color: transparent;
  z-index: 10;
  margin-vertical: ${({ theme }) => theme.space[3]};
`;
