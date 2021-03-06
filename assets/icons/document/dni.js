import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const DniIcon = (props) => (
  <Svg width={27} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.729.957S9.639.94 10.133.94s1.06-.018 1.06-.018.642.018 1.206.018c.565 0 2.404.018 2.404.018h5.278a2.404 2.404 0 0 1 2.404 2.405V14.58a2.404 2.404 0 0 1-2.404 2.404H2.451A2.401 2.401 0 0 1 .047 14.58V3.36A2.404 2.404 0 0 1 2.45.958h5.278ZM9.6 10.26a1.603 1.603 0 0 0-1.572-1.288H4.535c-.764 0-1.422.54-1.572 1.288l-.48 2.404a1.602 1.602 0 0 0 1.57 1.918H8.51a1.603 1.603 0 0 0 1.573-1.918L9.6 10.26Zm2.466.315h5.61a.802.802 0 0 0 0-1.603h-5.61a.802.802 0 0 0 0 1.603ZM6.283 3.362a2.405 2.405 0 0 0 0 4.808 2.405 2.405 0 0 0 0-4.808Zm5.786 4.808h7.212a.802.802 0 0 0 0-1.603h-7.213a.802.802 0 0 0 0 1.603Z"
      fill="#0D8284"
    />
  </Svg>
);
