import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const GoogleIcon = (props) => {
  return (
    <Svg width={19} height={19} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M4.187 11.417l-.658 2.455-2.403.051A9.404 9.404 0 010 9.446a9.4 9.4 0 011.056-4.344l2.14.392.938 2.127a5.615 5.615 0 00-.303 1.825c0 .694.126 1.358.356 1.971z"
        fill="#FBBB00"
      />
      <Path d="M18.728 7.682a9.468 9.468 0 01-.042 3.737 9.444 9.444 0 01-3.325 5.394h-.001l-2.695-.138-.382-2.381a5.63 5.63 0 002.423-2.875H9.654V7.682h9.074z" fill="#518EF8" />
      <Path d="M15.36 16.813h.002a9.406 9.406 0 01-5.914 2.08 9.445 9.445 0 01-8.321-4.97l3.061-2.505a5.617 5.617 0 008.096 2.876l3.077 2.519z" fill="#28B446" />
      <Path d="M15.476 2.175l-3.06 2.505a5.618 5.618 0 00-8.282 2.941L1.058 5.103A9.445 9.445 0 019.447 0c2.292 0 4.394.816 6.03 2.175z" fill="#F14336" />
    </Svg>
  );
};
