import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  padding-vertical: ${({ theme }) => theme.space[2]};
  width: 100%;
`;
