import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Button = styled.TouchableOpacity`
  width: 100%;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 0px 3px;
  shadow-radius: 5px;
  background-color: #fff;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
`;

const Info = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 0.8;
`;

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const ButtonSelect = ({ selected, onPress, children, name, value }) => {
  return (
    <FormGroup>
      <Button onPress={onPress}>
        <Info>{children}</Info>
        <MaterialCommunityIcons color="#0D8284" size={25} name={selected ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"} />
      </Button>
    </FormGroup>
  );
};
