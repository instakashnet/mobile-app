import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ValidationIcon = (props) => {
  return (
    <Svg width={73} height={90} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M36.5 0L0 16.364v24.545C0 63.614 15.573 84.846 36.5 90 57.427 84.846 73 63.614 73 40.91V16.363L36.5 0z" fill="#0D8284" />
      <Path d="M5.5 41.364V20.518l31-13.875 31 13.874v20.847c0 19.43-13.28 37.535-31 42.09-17.72-4.555-31-22.66-31-42.09z" stroke="#fff" strokeWidth={3} />
      <Path d="M29.076 51.091l-9.008-8.707L17 45.328 29.076 57 55 31.944 51.954 29 29.076 51.091z" fill="#fff" />
    </Svg>
  );
};
