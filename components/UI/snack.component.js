import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

// COMPONENTS
import { Text } from "../../components/typography/text.component";

const types = {
  warning: {
    bg: "rgb(255, 244, 229)",
    color: "rgb(102, 60, 0)",
    icon: "warning-outline",
  },
  info: {
    bg: "rgba(59, 130, 246, 0.2)",
    color: "rgb(13, 60, 97)",
    icon: "information-circle-outline",
  },
};

export const Dialog = styled.View`
  background-color: ${({ type }) => types[type].bg};
  border-radius: ${({ theme }) => theme.space[2]};
  padding-vertical: ${({ theme }) => theme.space[4]};
  margin-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[5]};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Info = styled(Text)`
  color: ${({ type }) => types[type].color};
`;

export const SnackBar = ({ type, children }) => {
  return (
    <Dialog type={type}>
      <Wrapper>
        <Ionicons name={types[type].icon} size={25} color={types[type].color} style={{ marginRight: 5 }} />
        <Info variant="button" type={type}>
          {children}
        </Info>
      </Wrapper>
    </Dialog>
  );
};
