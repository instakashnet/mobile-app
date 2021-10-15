import React from "react";

import { SlideView, SlideImage } from "./auth.styles";
import { Text } from "../../../components/typography/text.component";

export const SlideItem = ({ item }) => {
  return (
    <SlideView>
      <SlideImage source={item.image} />
      <Text variant="title">{item.title}</Text>
      {item.text}
    </SlideView>
  );
};
