import * as React from "react";
import Svg, { G, Rect, Path, Circle, Defs, RadialGradient, Stop, LinearGradient } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const DocumentIncorrect = (props) => (
  <Svg width={117} height={105} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G filter="url(#a)">
      <Rect x={4.81} y={5.139} width={107.581} height={66.732} rx={10.545} fill="#fff" stroke="#0D8284" strokeWidth={0.603} />
      <Path d="M7.273 7.151a7.833 7.833 0 0 1 5.215-2.01l91.823-.29a7.833 7.833 0 0 1 6.36 3.226l.138.19 1.247 2.182-107.236.312L6.38 7.955l.894-.804Z" fill="#0D8284" />
      <Path fill="#C4C4C4" d="M13.487 16.808h34.116v34.116H13.487z" />
      <Path d="M36.981 47.41c-4.2-1.488-8.446-1.435-12.68 0v-3.97c4.262-1.088 8.485-1.018 12.68 0v3.97Z" fill="url(#b)" />
      <Path
        d="M35.197 40.06c-.318-.003.254 4.022.548 4.988.39 1.287 2.832 2.286 5.34 3.046 1.15.349 3.28 1.884 3.572 2.479.168.34.16.38.16.38h-27.85l1.754-1.684a4.368 4.368 0 0 1 1.933-1.078l.854-.22 1.045-.491c.201-.095.391-.21.567-.344l2.145-1.624s.673-.84.617-2.11c-.056-1.27-.056-3.337-.056-3.337h9.371v-.005Z"
        fill="#F0CCB9"
      />
      <Path
        d="M41.085 48.094c-2.508-.76-4.95-1.759-5.34-3.046-.757.696-2.432 2.157-3.078 2.431-.807.344-2.825.492-3.673 0-.678-.392-2.768-1.475-3.729-1.968l-2.145 1.625a3.158 3.158 0 0 1-.567.343l-1.045.492-.854.22a4.368 4.368 0 0 0-1.933 1.078l-1.754 1.683h27.85s.008-.039-.16-.38c-.293-.594-2.421-2.13-3.572-2.478Z"
        fill="#ECECEC"
      />
      <Path d="M29.045 50.919h3.226l-.941-1.187h-1.307l-.978 1.187Z" fill="#676767" />
      <Path
        d="m30.352 46.924-1.78 1.778s.355 1.474 1.151 1.326c.075-.014-.006.07.355.232.382.17.866-.006 1.229-.056.46-.064.866-.338 1.1-.74l.436-.742-1.693-1.725-.798-.073Z"
        fill="#676767"
      />
      <Path d="M23.464 46.907s2.93 2.407 4.986 2.65c.164.019.592.033.662-.07l1.611-2.493-6.005-1.97-1.254 1.883Z" fill="url(#c)" />
      <Path d="M38.01 46.944s-2.93 2.406-4.986 2.649c-.165.02-.593.033-.662-.07L30.75 47.03l6.005-1.97 1.254 1.884Z" fill="url(#d)" />
      <Path
        d="M24.086 36.361s.888 4.352 3.123 5.703c3.488 2.11 5.885.321 5.885.321s2.784-2.493 3.24-3.961c.407-1.312.55-2.063.55-2.063s.368 0 .611-.304c.246-.305.308-2.245.49-2.792.184-.547.306-1.457-.308-1.396-.612.062-.919 1.092-.919 1.092s1.156-3.967.788-5.061c-.369-1.091-.73-1.25-2.198-2.16-1.47-.91-2.201-1.63-3.103-1.33-.903.305-5.115.495-6.276.07-1.165-.424-2.257 3.135-2.442 4.045-.184.91.492 3.705.553 4.433l.062.729s-.427-1.94-.796-2.063c-.369-.12-1.042-.12-.92 1.334.124 1.457.272.33.797 3.035.313 1.58.863.368.863.368Z"
        fill="#F0CCB9"
      />
      <Path
        d="M24.293 43.468s-.533 3.138-.877 3.224c-.34.09 3.793 2.122 5.316 2.317 0 0 .913-1.58 1.938-2.057 0 .003-6.164-2.085-6.377-3.484ZM36.992 43.44s.562 3.132.9 3.216c.337.084-3.73 2.164-5.232 2.376 0 0-.919-1.57-1.938-2.035.002-.003 6.077-2.158 6.27-3.557Z"
        fill="#F9F7F7"
      />
      <Path
        d="M24.135 32.8s-.508-1.6-.397-2.401c.115-.802-.452-4.056 1.472-4.629 1.925-.572 3.508.056 4.02-.055.508-.115 2.502-1.042 3.226-.857.818.206 3.622 2.456 4.3 2.456 0 0 .289 1.686.459 1.97.17.286-.176 2.603-.176 2.943 0 .343 0 .514.114.857 0 0 .17-.628.227-1.027.056-.4.734-1.43.734-1.43s.567-3.427.453-3.656c-.115-.23.567-.514-.453-2.401-1.02-1.884-5.547-4.628-7.415-4.855-1.869-.228-4.472 0-5.547 2.97 0 0-2.83.629-3.226 3.599-.397 2.97 1.81 5.086 1.81 5.999 0 .913.402 1.49.402 1.49l-.003-.974Z"
        fill="#404041"
      />
      <Path d="M29.218 32.19s-1.64-.452-3.975-.07c-1.1.182.21 2.267.243 2.3.034.034 1.919.314 3.522-.033.508-.108.698-2.23.21-2.197Z" fill="#EAEAEA" fillOpacity={0.8} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.258 32.524c.05.14-.77.236-.77.236s-.634 1.867-.975 1.962c-.34.093-3.675.118-3.902-.17-.167-.21-.41-.99-.53-1.393-.503-.304-.958-.134-1.28.1-.125.422-.346 1.098-.5 1.293-.229.288-3.563.265-3.901.17-.341-.092-.975-1.962-.975-1.962s-.523.223-.472.084c.084-.232-.123-.67-.288-.95.282.255.679.204.679.204s.159-.307.681-.323c.163-.005.341-.013.531-.02 1.372-.056 3.354-.136 4.539.374.413.06.496.043.7.005l.026-.005c1.185-.51 3.167-.43 4.538-.374.19.007.369.015.531.02.52.016.682.323.682.323s.4.05.678-.203c-.146.237-.097.36-.028.536l.036.093Zm-8.04-.334s-1.64-.452-3.975-.07c-1.1.182.21 2.267.243 2.3.033.034 1.919.314 3.522-.033.508-.108.698-2.23.21-2.197Zm6.47-.07c-2.335-.382-3.975.07-3.975.07-.489-.033-.296 2.089.21 2.197 1.603.347 3.488.067 3.522.034.033-.034 1.343-2.119.243-2.3Z"
        fill="#404041"
      />
      <Path d="M31.713 32.19s1.64-.452 3.974-.07c1.1.182-.21 2.267-.243 2.3-.033.034-1.919.314-3.522-.033-.505-.108-.698-2.23-.21-2.197Z" fill="#EAEAEA" fillOpacity={0.8} />
      <Path d="M37.191 31.688a.741.741 0 0 1-.156.204c.123-.207.22-.324.156-.204ZM23.452 31.894a.743.743 0 0 1-.156-.203c-.064-.123.033-.006.156.203Z" fill="#A8A8A8" />
      <Path
        fill="#C4C4C4"
        d="M54.786 17.258h15.711v4.489H54.786zM54.786 32.071H77.68v4.489H54.786zM54.786 38.804h35.912v4.489H54.786zM54.786 46.436h42.196v4.489H54.786zM54.786 24.44h31.872v4.489H54.786z"
      />
      <Path fill="#C4C4C4" stroke="#CACACA" strokeWidth={0.603} d="M55.087 53.919h44.736V64.09H55.087zM13.789 53.919h33.513V64.09H13.789z" />
      <Rect x={92.13} y={19.138} width={11.908} height={10.875} rx={2.548} fill="#C4C4C4" stroke="#000" strokeWidth={0.171} />
      <Path
        stroke="#000"
        strokeWidth={0.139}
        d="M92.044 20.636h12.078M92.044 28.171h12.078M100.716 23.01h3.406M92.044 23.01h3.716M92.044 25.694h3.716M100.716 25.694h3.406M95.692 30.099V19.053M100.647 30.099V19.053"
      />
    </G>
    <Circle cx={55.305} cy={83.722} r={20.577} fill="#FFCDCD" />
    <Path
      d="M64.758 74.27a1.575 1.575 0 0 0-2.227 0l-7.225 7.224-7.225-7.225a1.575 1.575 0 0 0-2.228 2.228l7.225 7.225-7.225 7.225a1.575 1.575 0 1 0 2.228 2.228l7.225-7.225 7.225 7.225a1.575 1.575 0 0 0 2.227-2.228l-7.225-7.225 7.225-7.225a1.575 1.575 0 0 0 0-2.228Z"
      fill="#FF4B55"
    />
    <Defs>
      <RadialGradient id="c" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.33807 0 0 3.33824 27.816 46.996)">
        <Stop stopColor="#8A8A8A" />
        <Stop offset={0.093} stopColor="#A0A0A0" />
        <Stop offset={0.24} stopColor="#BEBEBE" />
        <Stop offset={0.397} stopColor="#D5D5D5" />
        <Stop offset={0.565} stopColor="#E5E5E5" />
        <Stop offset={0.752} stopColor="#EFEFEF" />
        <Stop offset={0.995} stopColor="#F2F2F2" />
      </RadialGradient>
      <RadialGradient id="d" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.4776 0 0 3.47778 33.228 46.769)">
        <Stop stopColor="#8A8A8A" />
        <Stop offset={0.093} stopColor="#A0A0A0" />
        <Stop offset={0.24} stopColor="#BEBEBE" />
        <Stop offset={0.397} stopColor="#D5D5D5" />
        <Stop offset={0.565} stopColor="#E5E5E5" />
        <Stop offset={0.752} stopColor="#EFEFEF" />
        <Stop offset={0.995} stopColor="#F2F2F2" />
      </RadialGradient>
      <LinearGradient id="b" x1={24.3} y1={45.03} x2={36.981} y2={45.03} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#A1A1A1" />
        <Stop offset={0.058} stopColor="#B2B2B2" />
        <Stop offset={0.187} stopColor="#D4D4D4" />
        <Stop offset={0.311} stopColor="#ECECEC" />
        <Stop offset={0.425} stopColor="#FAFAFA" />
        <Stop offset={0.521} stopColor="#fff" />
        <Stop offset={0.645} stopColor="#FCFCFB" />
        <Stop offset={0.755} stopColor="#F1F1F1" />
        <Stop offset={0.86} stopColor="#DFDFDE" />
        <Stop offset={0.961} stopColor="#C6C6C5" />
        <Stop offset={1} stopColor="#BABAB9" />
      </LinearGradient>
    </Defs>
  </Svg>
);