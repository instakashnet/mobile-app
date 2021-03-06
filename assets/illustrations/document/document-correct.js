import * as React from "react";
import Svg, { G, Rect, Path, Circle, Defs, RadialGradient, Stop, LinearGradient } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const DocumentCorrect = (props) => (
  <Svg width={141} height={107} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G filter="url(#a)">
      <Rect x={13.639} y={8.139} width={105.347} height={65.341} rx={10.545} fill="#fff" stroke="#0D8284" strokeWidth={0.603} />
      <Path d="M16 10.145a7.834 7.834 0 0 1 5.215-2.011l89.782-.283a7.833 7.833 0 0 1 6.36 3.226l.087.12 1.221 2.136-105.021.306 1.526-2.748.83-.746Z" fill="#0D8284" />
      <Path fill="#C4C4C4" d="M22.131 19.561h33.411v33.411H22.131z" />
      <Path d="M45.142 49.53c-4.114-1.456-8.272-1.404-12.418 0v-3.887c4.174-1.066 8.31-.998 12.418 0v3.888Z" fill="url(#b)" />
      <Path
        d="M43.394 42.333c-.312-.003.249 3.939.536 4.885.383 1.26 2.774 2.239 5.23 2.982 1.127.342 3.212 1.846 3.499 2.428.164.334.156.372.156.372H25.54l1.718-1.648a4.278 4.278 0 0 1 1.893-1.056l.837-.216 1.023-.48c.197-.094.383-.206.555-.337l2.1-1.591s.66-.823.605-2.067c-.054-1.244-.054-3.267-.054-3.267h9.177v-.005Z"
        fill="#F0CCB9"
      />
      <Path
        d="M49.16 50.2c-2.456-.743-4.847-1.722-5.23-2.982-.741.681-2.382 2.112-3.014 2.381-.79.336-2.767.481-3.597 0-.664-.385-2.711-1.445-3.652-1.927l-2.1 1.59a3.098 3.098 0 0 1-.556.337l-1.023.481-.837.216a4.278 4.278 0 0 0-1.893 1.055L25.54 53h27.275s.008-.038-.156-.372c-.288-.582-2.372-2.086-3.499-2.428Z"
        fill="#ECECEC"
      />
      <Path d="M37.37 52.967h3.159l-.922-1.162h-1.28l-.958 1.162Z" fill="#676767" />
      <Path
        d="m38.649 49.055-1.743 1.741s.348 1.444 1.127 1.299c.074-.014-.005.068.348.227.374.167.848-.006 1.203-.055.451-.063.848-.33 1.078-.724l.427-.727-1.658-1.69-.782-.071Z"
        fill="#676767"
      />
      <Path d="M31.902 49.039s2.87 2.356 4.883 2.594c.161.02.58.033.648-.068l1.579-2.442-5.882-1.93-1.228 1.846Z" fill="url(#c)" />
      <Path d="M46.147 49.074s-2.87 2.357-4.882 2.595c-.162.019-.58.033-.649-.069l-1.578-2.441 5.881-1.93 1.228 1.845Z" fill="url(#d)" />
      <Path
        d="M32.512 38.71s.87 4.262 3.059 5.585c3.416 2.067 5.763.315 5.763.315s2.727-2.442 3.173-3.88c.4-1.284.539-2.02.539-2.02s.361 0 .599-.298c.24-.298.3-2.198.479-2.734.18-.536.3-1.427-.301-1.367-.6.06-.9 1.07-.9 1.07s1.132-3.886.771-4.957c-.36-1.07-.714-1.225-2.153-2.116-1.438-.892-2.155-1.597-3.039-1.302-.883.298-5.008.484-6.146.069-1.14-.416-2.21 3.07-2.39 3.961-.181.891.48 3.628.54 4.341l.061.714s-.419-1.9-.78-2.02c-.36-.118-1.02-.118-.9 1.306.12 1.428.266.323.78 2.972.306 1.548.845.361.845.361Z"
        fill="#F0CCB9"
      />
      <Path
        d="M32.715 45.67s-.522 3.073-.859 3.158c-.333.088 3.715 2.078 5.206 2.27 0 0 .894-1.548 1.898-2.016 0 .003-6.037-2.042-6.245-3.412ZM45.153 45.643s.55 3.068.88 3.15c.331.082-3.651 2.118-5.123 2.326 0 0-.9-1.536-1.898-1.993.002-.003 5.952-2.113 6.14-3.483Z"
        fill="#F9F7F7"
      />
      <Path
        d="M32.561 35.222s-.498-1.567-.388-2.351c.112-.785-.444-3.973 1.441-4.533 1.885-.56 3.436.055 3.936-.055.498-.112 2.451-1.02 3.16-.839.801.202 3.548 2.406 4.212 2.406 0 0 .282 1.651.449 1.93.167.279-.172 2.548-.172 2.881 0 .337 0 .503.112.84 0 0 .166-.615.221-1.006.055-.391.72-1.4.72-1.4s.555-3.357.443-3.581c-.112-.225.555-.503-.443-2.351-.999-1.846-5.433-4.533-7.263-4.755-1.83-.224-4.38 0-5.432 2.91 0 0-2.771.614-3.16 3.523-.388 2.909 1.773 4.981 1.773 5.875 0 .894.394 1.46.394 1.46l-.003-.954Z"
        fill="#404041"
      />
      <Path d="M37.538 34.626s-1.606-.443-3.893-.069c-1.078.178.205 2.22.238 2.253.033.033 1.88.306 3.45-.033.497-.106.683-2.184.205-2.151Z" fill="#EAEAEA" fillOpacity={0.8} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.412 34.952c.049.137-.754.231-.754.231s-.621 1.83-.955 1.922c-.334.09-3.6.115-3.821-.166-.164-.206-.402-.971-.52-1.365-.492-.298-.938-.13-1.253.099-.123.413-.339 1.074-.49 1.265-.224.282-3.49.26-3.82.167-.334-.09-.955-1.922-.955-1.922s-.512.22-.463.082c.082-.227-.12-.656-.281-.93.276.25.664.2.664.2s.156-.3.668-.317c.16-.005.334-.012.52-.02 1.343-.053 3.284-.132 4.445.367.404.058.486.043.685.005l.026-.005c1.16-.499 3.101-.42 4.445-.366l.52.02c.508.016.667.316.667.316s.391.05.665-.2c-.144.233-.096.354-.028.527l.035.09Zm-7.874-.326s-1.606-.443-3.893-.069c-1.077.178.206 2.22.238 2.253.033.033 1.88.306 3.45-.033.498-.106.684-2.184.205-2.151Zm6.335-.069c-2.286-.374-3.892.069-3.892.069-.479-.033-.29 2.045.205 2.151 1.57.34 3.416.066 3.45.033.032-.033 1.315-2.075.237-2.253Z"
        fill="#404041"
      />
      <Path d="M39.981 34.626s1.606-.443 3.893-.069c1.078.178-.205 2.22-.238 2.253-.033.033-1.88.306-3.45-.033-.495-.106-.683-2.184-.205-2.151Z" fill="#EAEAEA" fillOpacity={0.8} />
      <Path d="M45.346 34.134a.727.727 0 0 1-.153.199c.12-.202.216-.317.153-.2ZM31.89 34.336a.727.727 0 0 1-.152-.2c-.063-.12.032-.005.153.2Z" fill="#A8A8A8" />
      <Path
        fill="#C4C4C4"
        d="M62.577 20.001h15.387v4.396H62.577zM62.577 34.509h22.421v4.396H62.577zM62.577 41.103h35.17v4.396h-35.17zM62.577 48.577h41.325v4.396H62.577zM62.577 27.035H93.79v4.396H62.577z"
      />
      <Path fill="#C4C4C4" stroke="#CACACA" strokeWidth={0.603} d="M62.878 55.912h43.8v9.948h-43.8zM22.432 55.912h32.809v9.948H22.432z" />
      <Rect x={99.151} y={21.845} width={11.658} height={10.647} rx={2.548} fill="#C4C4C4" stroke="#000" strokeWidth={0.171} />
      <Path
        stroke="#000"
        strokeWidth={0.139}
        d="M99.064 23.308h11.829M99.064 30.688h11.829M107.557 25.633h3.336M99.064 25.633h3.64M99.064 28.262h3.64M107.557 28.262h3.336M102.635 32.577V21.759M107.487 32.577V21.759"
      />
    </G>
    <Circle cx={67.719} cy={86.314} r={20.152} fill="#E5F5EC" />
    <Path
      d="M65.148 96.858a2.096 2.096 0 0 1-1.674-.833l-5.382-7.112a2.097 2.097 0 0 1 1.144-3.297 2.096 2.096 0 0 1 2.204.765l3.542 4.676 8.905-14.3a2.103 2.103 0 0 1 2.894-.67 2.098 2.098 0 0 1 .671 2.893l-10.52 16.887a2.095 2.095 0 0 1-1.688.988c-.033.003-.063.003-.096.003Z"
      fill="#0D8284"
    />
    <Defs>
      <RadialGradient id="c" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.26913 0 0 3.2693 36.165 49.126)">
        <Stop stopColor="#8A8A8A" />
        <Stop offset={0.093} stopColor="#A0A0A0" />
        <Stop offset={0.24} stopColor="#BEBEBE" />
        <Stop offset={0.397} stopColor="#D5D5D5" />
        <Stop offset={0.565} stopColor="#E5E5E5" />
        <Stop offset={0.752} stopColor="#EFEFEF" />
        <Stop offset={0.995} stopColor="#F2F2F2" />
      </RadialGradient>
      <RadialGradient id="d" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.40578 0 0 3.40596 41.465 48.903)">
        <Stop stopColor="#8A8A8A" />
        <Stop offset={0.093} stopColor="#A0A0A0" />
        <Stop offset={0.24} stopColor="#BEBEBE" />
        <Stop offset={0.397} stopColor="#D5D5D5" />
        <Stop offset={0.565} stopColor="#E5E5E5" />
        <Stop offset={0.752} stopColor="#EFEFEF" />
        <Stop offset={0.995} stopColor="#F2F2F2" />
      </RadialGradient>
      <LinearGradient id="b" x1={32.723} y1={47.2} x2={45.142} y2={47.2} gradientUnits="userSpaceOnUse">
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
