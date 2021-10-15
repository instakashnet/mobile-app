import React from "react";
import DropDownPicker from "react-native-dropdown-picker";

export const IconSelect = ({ options, placeholder }) => {
  return (
    <DropDownPicker
      items={options}
      itemKey={(item) => {
        console.log(item);
        return item.value.toString();
      }}
      containerStyle={{ height: 80 }}
      dropDownContainerStyle={{}}
      placeholder={placeholder}
    />
  );
};
