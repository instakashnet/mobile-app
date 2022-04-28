import React from "react";
import { Switch } from "react-native";

export const CustomSwitch = ({ onToggle, enabled }) => {
  return <Switch trackColor={{ false: "#AFAFAF", true: "#C3E5D9" }} thumbColor={enabled ? "#20A2A5" : "#676767"} onValueChange={onToggle} value={enabled} />;
};
