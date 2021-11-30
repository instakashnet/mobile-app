import React from "react";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";

// COMPONENTS
import { Text } from "../../components/typography/text.component";
import { Spacer } from "../../components/utils/spacer.component";

const SlideImage = styled.Image`
  height: 180px;
  resize-mode: contain;
`;

const SlideView = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  height: ${(Dimensions.get("window").width * 3) / 4}px;

  align-items: center;
  justify-content: center;
`;

export const SlideItem = ({ item }) => {
  return (
    <SlideView>
      <SlideImage source={item.image} />
      <Spacer variant="top" size={2} />
      <Text variant="title" style={{ paddingHorizontal: 5 }}>
        {item.title}
      </Text>
      <Spacer variant="top" />
      {item.component}
    </SlideView>
  );
};
