import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const HomeIcon = (props) => {
  return (
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.386 1.21a1 1 0 011.228 0l9 7A1 1 0 0122 9v11a3 3 0 01-3 3H5a3 3 0 01-3-3V9a1 1 0 01.386-.79l9-7zM4 9.49V20a1 1 0 001 1h14a1 1 0 001-1V9.49l-8-6.223-8 6.222z"
        fill="#0D8284"
      />
      <Path fillRule="evenodd" clipRule="evenodd" d="M8 12a1 1 0 011-1h6a1 1 0 011 1v10a1 1 0 11-2 0v-9h-4v9a1 1 0 11-2 0V12z" fill="#0D8284" />
    </Svg>
  );
};
