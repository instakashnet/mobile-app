import React from "react";

// COMPONENTS
import { Item as DrawerItem, LabelWrapper, RightArrow, Icon } from "./drawer.styles";
import { Text } from "../../typography/text.component";

export const NavItem = ({ active, label, labelStyle, icon, onPress }) => {
  return (
    <DrawerItem
      focused={active === "my-profile"}
      icon={({ color }) => <Icon name={icon} color={color} />}
      label={() => (
        <LabelWrapper style={labelStyle || {}}>
          <Text>{label}</Text>
          <RightArrow />
        </LabelWrapper>
      )}
      onPress={onPress}
    />
  );
};
