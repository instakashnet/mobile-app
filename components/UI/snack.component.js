import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

// COMPONENTS
import { Text } from "../../components/typography/text.component";

export const Dialog = styled.View`
  background-color: rgba(59, 130, 246, 0.2);
  border-radius: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[3]};
  padding-vertical: ${({ theme }) => theme.space[4]};
  margin-vertical: ${({ theme }) => theme.space[2]};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Info = styled(Text)`
  color: rgb(13, 60, 97);
  width: 90%;
`;

export const SnackBar = ({ type, children }) => {
  return (
    <Dialog>
      <Wrapper>
        <Ionicons name="information-circle-outline" size={25} color="rgb(13, 60, 97)" style={{ marginRight: 5 }} />
        <Info variant="button">{children}</Info>
      </Wrapper>
    </Dialog>
  );
};
