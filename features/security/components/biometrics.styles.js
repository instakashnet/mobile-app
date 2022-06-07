import styled from "styled-components/native";

export const Container = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  flex: 0.95;
  margin-vertical: 10px;
  align-items: center;
`;
