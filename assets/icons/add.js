import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Add = (props) => {
  return (
    <Svg width={26} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M25.261 14.804H14.514V26.13h-3.82V14.804H0v-3.556h10.694V0h3.82v11.248h10.747v3.556z" fill="#fff" />
    </Svg>
  );
};
