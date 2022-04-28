import React from "react";
import { TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";

export const Tooltip = ({ icon: Icon, children }) => {
  return (
    <Popover from={<TouchableOpacity>{Icon}</TouchableOpacity>} popoverStyle={{ padding: 15 }}>
      {children}
    </Popover>
  );
};
