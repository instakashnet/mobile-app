import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const NoCameraWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
`;

export const CameraWrapper = styled.View`
  flex: 0.6;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const VerticalOverlay = styled.View`
  flex: 0.5;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const TopOverlay = styled.View`
  flex: 0.15;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const BottomOverlay = styled.View`
  flex: 0.25;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const HorizontalWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  padding: 12px;
`;

export const CameraSquare = styled.View`
  width: ${Dimensions.get('window').width / 1.2}px;
  border-width: 4px;
  border-color: #fff;
  height: 100%;
  border-radius: 12px;
`;

export const InfoWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LoaderWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const CameraLoader = styled(ActivityIndicator).attrs({
  size: 45,
  animating: true,
  color: '#FFF',
})`
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const HeaderWrapper = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
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
