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
  background-color: rgba(1, 1, 1, 0.8);
  height: ${((Dimensions.get('window').width - 20 * 2) * 2) / 3}px;
  width: 3%;
`;

export const TopOverlay = styled.View`
  flex: 40;
  width: 100%;
  background-color: rgba(1, 1, 1, 0.8);
`;

export const BottomOverlay = styled.View`
  flex: 32;
  background-color: rgba(1, 1, 1, 0.8);
`;

export const BottomInfoWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  background-color: #000;
  align-items: center;
  justify-content: center;
  padding: 15px;
  padding-bottom: 40px;
  margin-top: auto;
`;

export const SquareWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const Square = styled.View`
  top: 0;
  left: 0;
  border-color: #fff;
  border-width: 3px;
  width: 94%;
  height: ${((Dimensions.get('window').width - 20 * 2) * 2) / 3}px;
  border-radius: 5px;
`;

export const InfoWrapper = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const LoaderWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const CameraLoader = styled(ActivityIndicator).attrs({
  size: 45,
  animating: true,
  color: '#0d8284',
})`
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const HeaderWrapper = styled.View`
  width: 100%;
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
