import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path, Mask, G } from 'react-native-svg'
export const EmptyAccount = ({ width, ...rest }) => {
  const aspectRatio = 210 / 133

  return (
    <View style={{ width, aspectRatio }}>
      <Svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='none' viewBox='0 0 210 133' {...rest}>
        <Path
          fill='#EEE'
          d='M154.046 26.657c0-3.209.865-5.814 2.584-7.814 1.723-2 3.985-3 6.773-3 2.833 0 5.111.988 6.835 2.964 1.724 1.976 2.583 4.653 2.583 8.03v2.587c0 3.234-.859 5.833-2.583 7.798-1.724 1.963-3.98 2.946-6.774 2.946-2.81 0-5.083-.989-6.818-2.964-1.735-1.977-2.6-4.642-2.6-7.995v-2.552Zm5.704 2.767c0 1.438.344 2.594 1.026 3.468.682.874 1.58 1.311 2.688 1.311 1.109 0 1.99-.443 2.644-1.33.654-.885.981-2.071.981-3.556v-2.66c0-1.436-.327-2.598-.981-3.484-.654-.887-1.557-1.33-2.705-1.33-1.086 0-1.968.437-2.644 1.311-.671.875-1.009 2.09-1.009 3.648v2.622Zm14.972 26.661c0-3.234.871-5.839 2.617-7.815 1.74-1.976 3.996-2.964 6.774-2.964 2.81 0 5.083.976 6.818 2.928 1.729 1.953 2.594 4.641 2.594 8.066v2.588c0 3.21-.848 5.802-2.55 7.779-1.707 1.976-3.974 2.964-6.807 2.964-2.849 0-5.139-.994-6.862-2.982-1.719-1.988-2.584-4.624-2.584-7.905v-2.659Zm5.704 2.803c0 1.317.355 2.443 1.07 3.377.715.934 1.602 1.402 2.672 1.402 2.417 0 3.625-1.617 3.625-4.851v-2.73c0-1.438-.338-2.594-1.009-3.468-.67-.875-1.563-1.312-2.671-1.312-1.115 0-2.002.438-2.678 1.312-.671.874-1.009 2.066-1.009 3.575v2.695Zm-15.271 6.108-4.185-2.73 21.119-40.89 4.191 2.73-21.125 40.89Z'
        />
        <Path
          fill='#EEE'
          fillRule='evenodd'
          d='M9.294 125.243c-2.279-1.589-4.35-2.961-5.96-5.23-1.201-1.697-2.164-3.623-2.685-5.646-4.451-17.255 19.028-20.148 25.523-31.916 2.354-4.267 3.213-9.362 3.306-14.196.089-4.747-.168-10.194 4.369-13.119C48.181 45.893 59.994 71.854 73.254 58c13.421-14.022.557-38.2 16.999-52.069a22.5 22.5 0 0 1 7.119-4.03c2.996-1.04 6.177-1.437 9.337-1.234 3.62.232 7.197 1.382 10.432 2.989 2.943 1.459 5.682 3.31 8.068 5.577 12.026 11.436 7.194 27.671 13.032 41.55 3.624 8.606 12.383 10.76 20.629 12.712 5.932 1.405 12.651 3.564 15.012 9.836 4.433 11.803-9.052 16.996-13.168 25.781-3.035 6.476 3.799 9.086 3.916 14.209.1 4.336-4.458 6.509-3.395 11.844l-151.94.078ZM21.91 36.168a1.68 1.68 0 0 0-1.677-1.682h-3.376a1.68 1.68 0 0 0-1.678 1.682v10.256c0 .929.751 1.682 1.678 1.682h3.376a1.68 1.68 0 0 0 1.677-1.682V36.168ZM30.795 31.435c0-.446-.178-.874-.491-1.19a1.67 1.67 0 0 0-1.186-.493h-3.376c-.444 0-.872.178-1.186.493a1.688 1.688 0 0 0-.492 1.19v14.988c0 .447.178.875.492 1.19.314.315.742.493 1.186.493h3.376a1.67 1.67 0 0 0 1.186-.493c.313-.315.491-.743.491-1.19V31.435ZM39.68 16.699c0-.446-.178-.874-.492-1.19a1.67 1.67 0 0 0-1.185-.492h-3.376c-.444 0-.872.177-1.186.493a1.688 1.688 0 0 0-.492 1.189v29.725c0 .446.178.874.492 1.19.314.315.742.492 1.186.492h3.376a1.67 1.67 0 0 0 1.185-.492c.314-.316.492-.744.492-1.19V16.699Z'
          clipRule='evenodd'
        />
        <Path
          fill='#EEE'
          fillRule='evenodd'
          d='M48.565 28.826c0-.446-.178-.874-.491-1.189a1.67 1.67 0 0 0-1.186-.493h-3.376c-.444 0-.872.178-1.186.493a1.688 1.688 0 0 0-.492 1.19v17.598c0 .446.178.873.492 1.189.32.318.745.494 1.186.493h3.376a1.67 1.67 0 0 0 1.186-.493c.313-.316.491-.743.491-1.19V28.827ZM57.45 25.25c0-.447-.177-.875-.491-1.19a1.67 1.67 0 0 0-1.186-.493h-3.376c-.443 0-.872.177-1.185.493a1.688 1.688 0 0 0-.492 1.19v21.173c0 .446.178.874.492 1.19.313.315.742.492 1.185.492h3.376a1.67 1.67 0 0 0 1.186-.492 1.69 1.69 0 0 0 .492-1.19V25.25Z'
          clipRule='evenodd'
        />
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M46.928 123.012h62.741v2.791H46.928v-2.791ZM46.928 117.431h62.741v2.791H46.928v-2.791ZM46.928 111.85h62.741v2.79H46.928v-2.79ZM46.928 106.268h62.741v2.791H46.928v-2.791ZM46.928 100.687h62.741v2.791H46.928v-2.791ZM46.928 95.106h62.741v2.79H46.928v-2.79Z'
          clipRule='evenodd'
        />
        <Path
          fill='#A6D2E4'
          fillRule='evenodd'
          d='M46.928 120.222h62.741v2.791H46.928v-2.791ZM46.928 114.641h62.741v2.791H46.928v-2.791ZM46.928 109.058h62.741v2.791H46.928v-2.791ZM46.928 103.477h62.741v2.79H46.928v-2.79ZM46.928 97.895h62.741v2.791H46.928v-2.79ZM46.928 92.314h62.741v2.791H46.928v-2.79Z'
          clipRule='evenodd'
        />
        <Path
          fill='#023341'
          fillRule='evenodd'
          d='M109.669 123.012h28.905v2.791h-28.905v-2.791ZM109.669 117.431h28.905v2.791h-28.905v-2.791ZM109.669 111.85h28.905v2.79h-28.905v-2.79ZM109.669 106.268h28.905v2.791h-28.905v-2.791ZM109.669 100.687h28.905v2.791h-28.905v-2.791ZM109.669 95.106h28.905v2.79h-28.905v-2.79Z'
          clipRule='evenodd'
        />
        <Path
          fill='#4B7686'
          fillRule='evenodd'
          d='M109.669 120.222h28.905v2.791h-28.905v-2.791ZM109.669 114.641h28.905v2.791h-28.905v-2.791ZM109.669 109.058h28.905v2.791h-28.905v-2.791ZM109.669 103.477h28.905v2.79h-28.905v-2.79ZM109.669 97.895h28.905v2.791h-28.905v-2.79ZM109.669 92.314h28.905v2.791h-28.905v-2.79Z'
          clipRule='evenodd'
        />
        <Path
          fill='#FAD8BA'
          d='M133.551 26.413c-1.442-1.98-4.539-2.17-6.918-.424-2.38 1.746-3.14 4.766-1.699 6.746 1.442 1.98 4.539 2.17 6.918.425 2.379-1.746 3.14-4.767 1.699-6.747Z'
        />
        <Mask
          id='a'
          width={11}
          height={11}
          x={124}
          y={24}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M133.551 26.413c-1.441-1.98-4.539-2.17-6.918-.424-2.38 1.746-3.14 4.767-1.699 6.747 1.442 1.98 4.539 2.17 6.918.423 2.38-1.745 3.14-4.766 1.699-6.746Z'
          />
        </Mask>
        <G mask='url(#a)'>
          <Path
            fill='#D7B699'
            fillRule='evenodd'
            d='M134.957 27.413a7.802 7.802 0 0 1-.996 2.393c-.21.344-.424.723-.742.977-.82.65-2.107.705-3.08.478a3.718 3.718 0 0 1-1.251-.562c-.799-.545-1.689-1.787-2.766-1.035a1.842 1.842 0 0 0-.425.422 2.46 2.46 0 0 0-.371.733 2.683 2.683 0 0 0-.133.819c-.019 2.308 2.68 3.38 4.605 3.398 2.021.019 5.455-1.648 6.345-3.99.399-1.056-1.525-2.814-1.186-3.633Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#023341'
          fillRule='evenodd'
          d='M150.475 4.811c.208-1.137-.91-3.329-1.961-3.12-3.231.644-9.319 3.383-12.551 4.027-1.05.21-2.069 1.3-2.277 2.438-.824 4.509-3.773 14.423-4.597 18.932-.208 1.137 1.47 2.675 2.521 2.466l12.986-2.588c1.051-.21 2.07-1.3 2.278-2.438l3.601-19.717Z'
          clipRule='evenodd'
        />
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M149.412 3.292c.207-1.138-.475-1.89-1.526-1.68L134.9 4.198c-1.05.209-2.07 1.3-2.278 2.438l-3.601 19.717c-.208 1.137.475 1.89 1.525 1.68l12.987-2.587c1.05-.21 2.07-1.301 2.277-2.438l3.602-19.717Z'
          clipRule='evenodd'
        />
        <Path
          fill='#fff'
          fillRule='evenodd'
          d='M147.742 5.225c.184-1.01-.421-1.68-1.355-1.493l-10.674 2.126c-.932.186-1.839 1.156-2.023 2.166l-.268 1.467c-.184 1.01.423 1.678 1.355 1.493l10.674-2.127c.934-.186 1.839-1.156 2.023-2.166l.268-1.466ZM135.144 14.145c.112-.612-.256-1.017-.82-.904l-.695.138c-.564.113-1.113.7-1.224 1.311l-.26 1.424c-.112.612.255 1.017.819.904l.696-.138c.564-.113 1.112-.7 1.224-1.311l.26-1.424ZM134.247 19.047c.112-.612-.256-1.016-.82-.904l-.695.139c-.564.112-1.113.7-1.224 1.31l-.26 1.425c-.112.611.255 1.016.819.904l.696-.139c.564-.112 1.112-.7 1.224-1.31l.26-1.425ZM133.354 23.951c.111-.611-.256-1.016-.82-.904l-.695.139c-.564.112-1.113.7-1.225 1.311l-.26 1.424c-.112.612.256 1.017.82.904l.695-.138c.564-.113 1.113-.7 1.224-1.312l.261-1.424ZM139.32 13.31c.112-.611-.256-1.016-.82-.903l-.695.138c-.564.113-1.113.7-1.225 1.312l-.26 1.424c-.111.611.256 1.016.82.903l.695-.138c.564-.112 1.113-.7 1.225-1.311l.26-1.424ZM138.423 18.215c.112-.612-.255-1.016-.819-.904l-.696.139c-.564.112-1.112.7-1.224 1.31l-.26 1.425c-.112.612.256 1.016.82.904l.695-.139c.564-.112 1.113-.7 1.224-1.31l.26-1.425ZM137.53 23.12c.112-.612-.256-1.017-.82-.904l-.695.138c-.564.113-1.113.7-1.225 1.312l-.26 1.424c-.111.611.256 1.016.82.903l.695-.138c.564-.113 1.113-.7 1.225-1.311l.26-1.424ZM143.497 12.479c.111-.612-.256-1.016-.82-.904l-.695.138c-.564.113-1.113.7-1.225 1.312l-.26 1.424c-.112.611.256 1.016.82.903l.695-.138c.564-.112 1.113-.7 1.225-1.311l.26-1.424ZM146.935 11.794c.111-.612-.256-1.016-.82-.904l-.695.138c-.564.113-1.113.7-1.225 1.312l-.26 1.424c-.112.611.256 1.016.82.904l.695-.139c.564-.112 1.113-.7 1.225-1.311l.26-1.424ZM142.603 17.383c.111-.611-.256-1.016-.82-.904l-.695.139c-.564.112-1.113.7-1.225 1.311l-.26 1.424c-.112.612.256 1.016.82.904l.695-.139c.564-.112 1.113-.7 1.224-1.31l.261-1.425ZM141.706 22.286c.112-.612-.256-1.017-.82-.904l-.695.138c-.564.113-1.113.7-1.224 1.312l-.26 1.424c-.112.611.255 1.016.819.903l.696-.138c.564-.112 1.112-.7 1.224-1.311l.26-1.424ZM145.775 16.752c.111-.612-.256-1.017-.821-.904l-.164.032c-.565.113-1.114.7-1.225 1.312l-1.156 6.328c-.112.612.255 1.016.821.903l.163-.032c.566-.113 1.114-.7 1.226-1.311l1.156-6.328Z'
          clipRule='evenodd'
        />
        <Path
          fill='#FAD8BA'
          d='M132.021 23.456c-.644-.884-2.875-.348-4.984 1.199-2.108 1.546-3.295 3.517-2.651 4.402.645.885 2.876.348 4.984-1.198 2.108-1.547 3.295-3.518 2.651-4.403Z'
        />
        <Path
          fill='#85CBB2'
          fillRule='evenodd'
          d='M68.211 48.892s22.203 8.893 32.646 6.61c10.44-2.284 30.002-20.312 30.002-20.312-.442-4.177-2.912-6.486-8.154-6.235 0 0-18.586 9.62-24.834 10.81-4.315.82-7.592-2.78-12.66-3.674-5.094-.898-17 12.801-17 12.801Z'
          clipRule='evenodd'
        />
        <Mask
          id='b'
          width={63}
          height={28}
          x={68}
          y={28}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M68.211 48.892s22.203 8.893 32.646 6.61c10.44-2.284 30.002-20.312 30.002-20.312-.442-4.177-2.913-6.486-8.154-6.235 0 0-18.586 9.62-24.835 10.81-4.314.82-7.591-2.78-12.659-3.674-5.095-.898-17 12.801-17 12.801Z'
          />
        </Mask>
        <G fillRule='evenodd' clipRule='evenodd' mask='url(#b)'>
          <Path
            fill='#023341'
            d='M130.79 40.387c-.479-.688-3.334-.245-3.365-1.096-.161-4.295-2.712-6.055-4.92-7.456-1.059-.673-2.917-.768-4.13-1.079a10.79 10.79 0 0 0-1.19-.242c-.046-.006-.564-.027-.568-.065-.012-.18.957-.746 1.084-.841.359-.268.766-.718 1.198-.853 1.051-.331.119.566 2.003.54 6.675-.097 10.453 5.803 9.888 11.092Z'
          />
          <Path
            fill='#0A686A'
            d='M126.736 41.333c-1.653 1.819-4.491 3.2-6.759 4.403-6.223 3.297-13.521 5.725-20.818 6.407-3.192.299-6.243.052-9.308-.578-1.263-.26-2.949-.827-4.023.205-1.07 1.03-.769 2.644-.484 3.813 1.021 4.207 4.956 5.942 10.074 5.48 10.28-.928 24.604-13.445 31.318-19.73Z'
          />
        </G>
        <Path
          fill='#85CBB2'
          fillRule='evenodd'
          d='M87.278 37.02c-2.428-2.222-16.554-3.133-19.808 2.703-4.155 7.453-5.12 42.013-5.12 42.013l34.202-16.584s-4.526-23.784-9.274-28.132Z'
          clipRule='evenodd'
        />
        <Mask
          id='c'
          width={35}
          height={47}
          x={62}
          y={35}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M87.278 37.02c-2.428-2.222-16.554-3.133-19.808 2.703-4.155 7.453-5.12 42.013-5.12 42.013l34.202-16.584s-4.526-23.784-9.274-28.132Z'
          />
        </Mask>
        <G mask='url(#c)'>
          <Path
            fill='#0A686A'
            fillRule='evenodd'
            d='M57.741 64.637c1.784.307 8.52-11.96 8.52-11.96s2.123 4.106 1.51 9.933c-.136 1.288.388 2.863 1.808 3.242 1.95.52 4.016-.758 5.646-1.657 2.457-1.353 5-2.647 7.79-3.127 1.993-.343 5.292-.486 5.16 2.372-.15 3.255-3.26 6.01-5.603 7.848-4.8 3.761-10.65 6.58-16.096 9.276-1.844.913-4.533 2.495-6.673 1.721-3.253-1.177-3.413-6.777-3.331-9.536.078-2.743.595-5.46 1.27-8.112Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#023341'
          fillRule='evenodd'
          d='M78.936 47.07a8.08 8.08 0 0 1-.467.885c-.866 1.41-2.118 2.606-2.803 4.125-.14.309-.321.749-.346 1.156-.018.346.068.67.314.919.578.584 1.262.458 1.897-.026.774-.589 1.462-1.736 1.644-2.197.582-1.459.796-3.177.503-4.774.407-.971.62-2.003.642-3.079.022-1.188-.253-2.482.204-3.618.453-1.128 1.184-1.505 1.747-1.958.346-.28.642-.584.831-1.03.186-.43.268-.998.175-1.827a.362.362 0 0 0-.396-.315.355.355 0 0 0-.314.397c.072.639.029 1.087-.103 1.426-.2.505-.592.76-1.01 1.072-.563.425-1.173.924-1.594 1.968-.485 1.216-.228 2.6-.253 3.871-.012.632-.1 1.26-.264 1.87a6.073 6.073 0 0 0-1.006-1.754c-.724-.873-1.623-1.365-2.596-1.73-.913-.342-1.887-.57-2.818-.936-2.839-1.113-5.428-3.343-5.796-6.577a.36.36 0 0 0-.395-.315.358.358 0 0 0-.314.396c.4 3.506 3.167 5.957 6.245 7.163.934.366 1.912.596 2.828.94.856.322 1.659.746 2.297 1.517.585.704.956 1.542 1.148 2.43Zm.157 1.232-.017.03c-.853 1.384-2.087 2.552-2.761 4.044-.093.206-.218.483-.264.759-.032.189-.043.381.09.516.295.296.638.153.959-.092.667-.507 1.255-1.496 1.412-1.893a8.279 8.279 0 0 0 .581-3.364Z'
          clipRule='evenodd'
        />
        <Path
          fill='#F8FAFB'
          fillRule='evenodd'
          d='M136.949 97.236c7.164-.31 17.278 11.402 20.983 14.053 2.752 1.974-.76 5.056-.76 5.056-8.296-.15-20.367-4.186-23.738-7.371-2.089-1.974.305-11.6 3.515-11.738Z'
          clipRule='evenodd'
        />
        <Mask
          id='d'
          width={27}
          height={20}
          x={132}
          y={97}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M136.944 97.237c7.163-.307 17.284 11.404 20.991 14.055 2.753 1.975-.758 5.054-.758 5.054-8.297-.155-20.37-4.195-23.743-7.38-2.09-1.974.299-11.593 3.51-11.73Z'
          />
        </Mask>
        <G mask='url(#d)'>
          <Path
            fill='#3E725F'
            fillRule='evenodd'
            d='M155.648 108.394c-1.578 3.146-8.928 6.948-18.995-3.88-1.599-1.722-2.126-4.201-2.704-7.015-.39-1.918-2.263 4.674-2.329 6.144-.172 3.965 1.588 6.908 3.487 9.092 4.063 4.678 10.213 7.118 16.031 7.039 2.565-.037 5.597-.479 8.065-2.708 3.473-3.138 3.489-8.467 2.006-12.077-2.531-6.161-.462 4.927-5.561 3.405Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#F8FAFB'
          fillRule='evenodd'
          d='M124.726 97.244c7.458 1.425 15.647 15.431 18.963 18.943 2.462 2.614-1.759 4.808-1.759 4.808-8.639-2.789-20.228-9.056-23.096-13.014-1.777-2.454 2.55-11.377 5.892-10.737Z'
          clipRule='evenodd'
        />
        <Mask
          id='e'
          width={27}
          height={24}
          x={118}
          y={97}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M124.724 97.246c7.459 1.425 15.649 15.43 18.965 18.942 2.463 2.613-1.759 4.806-1.759 4.806-8.64-2.789-20.23-9.055-23.098-13.014-1.777-2.453 2.55-11.374 5.892-10.734Z'
          />
        </Mask>
        <G mask='url(#e)'>
          <Path
            fill='#3E725F'
            fillRule='evenodd'
            d='M141.889 112.775c-2.237 2.726-10.563 4.706-18.868-8.414-1.319-2.086-1.385-4.661-1.437-7.578-.033-1.988-3.241 4.068-3.592 5.504-.944 3.873.305 7.204 1.844 9.817 3.292 5.6 9.173 9.493 15.197 10.819 2.656.582 5.873.878 8.853-.727 4.193-2.262 5.239-7.518 4.404-11.441-1.424-6.694-1.428 4.754-6.401 2.02Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#03222F'
          fillRule='evenodd'
          d='M93.558 92.683c-23.34.735-19.17-15.288-14.043-20.83 5.127-5.543 31.72-17.267 44.804-12.423 13.084 4.843 33.693 41.485 33.693 41.485-5.604 3.559-14.416 7.62-27.023-.245l-20.695-12.778s-9.762 4.572-16.736 4.791Z'
          clipRule='evenodd'
        />
        <Path
          fill='#023341'
          fillRule='evenodd'
          d='M80.383 92.683c-23.34.735-19.17-15.288-14.043-20.83 5.127-5.543 31.72-17.267 44.804-12.423 13.084 4.843 33.692 41.485 33.692 41.485-5.603 3.559-14.415 7.62-27.022-.245L97.119 87.892s-9.762 4.572-16.736 4.791Z'
          clipRule='evenodd'
        />
        <Mask
          id='f'
          width={83}
          height={48}
          x={62}
          y={58}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M80.383 92.683c-23.34.735-19.17-15.288-14.043-20.83 5.127-5.543 31.72-17.267 44.804-12.423 13.084 4.843 33.692 41.485 33.692 41.485-5.603 3.559-14.415 7.62-27.022-.245L97.119 87.892s-9.762 4.572-16.736 4.791Z'
          />
        </Mask>
        <G mask='url(#f)'>
          <Path
            fill='#03222F'
            fillRule='evenodd'
            d='M85.771 59.332c-5.022 3.295-9.537 8.245-12.016 13.746-1.423 3.155-1.808 6.716 2.154 8.004.856.277 1.773.416 2.664.463 2.38.127 4.812-.446 7.13-.91 2.597-.52 5.332-.949 7.868-1.737 1.28-.398 2.258-1.197 3.264-2.054.203-.174.83-.91 1.152-.763.478.218.517 1.908.667 2.35.495 1.502 1.562 2.82 2.767 3.81 3.524 2.885 8.25 3.479 11.834 6.17 4.316 3.24 6.955 7.482 11.763 10.458 10.678 6.613 15.793 3.547 17.323 3.555 3.559.025 4.765-2.099 3.363.24-1.405 2.342-4.301 3.699-6.805 4.45-6.006 1.794-12.875.817-18.689-1.195-4.137-1.432-8.232-2.95-12.501-3.969-5.714-1.364-11.574-2.044-17.42-2.521-9.272-.757-19.722-.294-28.368-4.233-1.855-.845-3.599-1.973-5.097-3.36-.984-.91-1.868-1.95-2.557-3.103-4.808-8.035 20.715-27.46 31.504-29.4Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#4B7686'
          fillRule='evenodd'
          d='M81.663 101.281c3.114-2.14-27.134-17.22-31.593-14.77-14.883 8.184-25.817 18.996-34 31.631l34.719 7.661c7.65-11.954 20.334-21.552 30.874-24.522Z'
          clipRule='evenodd'
        />
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M73.655 92.314c2.655-2.958-31.95-10.858-35.9-7.25-13.185 12.05-21.69 25.804-26.936 40.737h39.654c4.87-14.103 13.15-27.84 23.182-33.487Z'
          clipRule='evenodd'
        />
        <Path
          fill='#fff'
          fillRule='evenodd'
          d='M27.334 103.891c-3.092 5.521-1.136 12.522 4.364 15.626 5.5 3.103 12.475 1.141 15.566-4.38 2.217-3.958 1.84-8.677-.578-12.174a11.372 11.372 0 0 0-3.785-3.452c-5.5-3.103-12.475-1.141-15.567 4.38Zm1.037.585c2.77-4.947 9.02-6.705 13.947-3.925 4.928 2.78 6.68 9.054 3.91 14.001-2.77 4.947-9.02 6.703-13.947 3.923-4.927-2.781-6.68-9.052-3.91-13.999Z'
          clipRule='evenodd'
        />
        <Path
          fill='#fff'
          d='M41.215 109.464c-.457-.258-.892-.336-1.305-.233-.413.101-.905.392-1.475.874a17.32 17.32 0 0 1-1.566 1.193 5.682 5.682 0 0 1-1.414.699c-.467.151-.96.205-1.447.157-.496-.047-1.016-.225-1.562-.533-.943-.532-1.546-1.27-1.81-2.215-.263-.944-.165-1.945.296-3.004l-1.79-1.01.752-1.343 1.815 1.024c.695-.913 1.54-1.456 2.536-1.63.997-.174 2.04.045 3.127.659l-1.36 2.427c-.669-.378-1.246-.522-1.733-.432-.488.09-.861.367-1.121.831-.257.459-.327.888-.208 1.287.118.398.406.726.863.984.424.239.833.307 1.227.206.395-.102.913-.411 1.555-.929a17.39 17.39 0 0 1 1.681-1.223c.478-.297.95-.509 1.414-.639a3.582 3.582 0 0 1 1.402-.104c.47.059.958.232 1.465.518.948.535 1.551 1.267 1.81 2.193.26.927.15 1.941-.327 3.041l1.665.94-.748 1.334-1.656-.934c-.766 1.079-1.669 1.738-2.71 1.98-1.041.241-2.134.039-3.277-.606l1.36-2.427c.663.375 1.26.504 1.791.387.532-.117.963-.471 1.296-1.065.275-.492.364-.955.264-1.387-.1-.431-.37-.771-.81-1.02Z'
        />
        <Path
          fill='#fff'
          fillRule='evenodd'
          d='M64.388 90.46c-.024.143-.08.206-.143.314-.125.222-.283.566-.349 1.514-.027.357.122.776.367 1.185.327.547.896 1.186 1.17 1.485l-.214.231c-2.392 2.54-14.061 14.904-17.207 29.985a.36.36 0 0 0 .277.424.358.358 0 0 0 .423-.278c3.107-14.91 14.66-27.127 17.025-29.64.22-.234.364-.388.42-.456a.512.512 0 0 0 .078-.126c.023-.056.065-.203-.054-.379-.125-.181-.87-.89-1.305-1.615-.16-.267-.286-.532-.27-.765.065-.91.21-1.13.32-1.315.111-.184.198-.345.186-.78a.392.392 0 0 0-.164-.309c-.08-.06-.304-.156-.665-.255-2.618-.723-13.643-2.59-18.78-3.178-1.328-.152-2.275-.214-2.612-.162-.992.155-1.272.605-1.522 1.108-.176.352-.316.752-.923 1.013-.212.09-.49.12-.793.134-.527.023-1.135-.013-1.704.018-.724.041-1.385.205-1.805.644-7.212 7.533-15.48 16.889-21.786 33.563-.351.933-.464.855-.804 1.836a.356.356 0 1 0 .673.237c.337-.972.45-.895.799-1.819C21.285 106.52 29.5 97.232 36.659 89.753c.179-.188.43-.287.71-.348.333-.072.705-.087 1.08-.09.858-.005 1.728.039 2.276-.196.677-.29.948-.693 1.156-1.094.215-.42.313-.851 1.12-.977.42-.065 1.862.082 3.81.336 4.66.607 12.149 1.862 15.771 2.632.799.17 1.41.315 1.749.424l.057.02Z'
          clipRule='evenodd'
        />
        <Path
          fill='#FAD8BA'
          fillRule='evenodd'
          d='M34.118 91.553a6.424 6.424 0 0 1-.096-1.121c0-2.956 1.983-5.355 4.426-5.355 2.44 0 4.426 2.4 4.426 5.355 0 2.955-1.986 5.354-4.426 5.354-.3 0-.592-.037-.874-.105-.121 2.733-.938 4.851-1.933 4.851-1.073 0-1.944-2.482-1.944-5.538 0-1.3.157-2.496.421-3.441Z'
          clipRule='evenodd'
        />
        <Mask
          id='g'
          width={10}
          height={16}
          x={33}
          y={85}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M34.118 91.553a6.424 6.424 0 0 1-.096-1.121c0-2.956 1.983-5.355 4.426-5.355 2.44 0 4.426 2.4 4.426 5.355 0 2.955-1.986 5.354-4.426 5.354-.3 0-.592-.037-.874-.105-.121 2.733-.938 4.851-1.933 4.851-1.073 0-1.944-2.482-1.944-5.538 0-1.3.157-2.496.421-3.441Z'
          />
        </Mask>
        <G mask='url(#g)'>
          <Path
            fill='#D7B699'
            fillRule='evenodd'
            d='M34.055 85.901c.33.94 1.073 1.755 1.744 2.461.626.66 1.29 1.14 2.136 1.473 1.28.504 2.74.575 3.877-.301 1.403-1.08 2.138-3.524 1.316-5.134-.392-.769-1.128-1.309-1.93-1.59a5.597 5.597 0 0 0-2.07-.286c-1.072.046-4.103 2.935-5.073 3.377Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#85CBB2'
          fillRule='evenodd'
          d='M68.207 36.746s-19.432 6.956-25.024 14.913c-5.833 8.307-9.986 34.925-9.986 34.925 3.012 2.917 6.381 3.093 10.236-.481 0 0 8.407-19.64 12.107-24.308 2.228-2.812 10.093-3.697 10.093-3.697l2.574-21.352Z'
          clipRule='evenodd'
        />
        <Mask
          id='h'
          width={36}
          height={53}
          x={33}
          y={36}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M68.207 36.746s-19.432 6.956-25.024 14.913c-5.833 8.307-9.986 34.925-9.986 34.925 3.012 2.917 6.381 3.093 10.236-.481 0 0 8.407-19.64 12.107-24.308 2.228-2.812 10.093-3.697 10.093-3.697l2.574-21.352Z'
          />
        </Mask>
        <G fillRule='evenodd' clipRule='evenodd' mask='url(#h)'>
          <Path
            fill='#023341'
            d='M29.918 82.55c.807.217 2.71-1.964 3.28-1.332 2.871 3.189 5.951 2.891 8.54 2.541 1.242-.168 2.726-1.294 3.855-1.838.363-.177.724-.366 1.066-.582.04-.025.45-.344.477-.317.125.13-.256 1.19-.292 1.344-.104.437-.128 1.045-.372 1.427-.593.932-.453-.357-1.88.879-5.052 4.382-11.722 2.296-14.674-2.123Z'
          />
          <Path
            fill='#0A686A'
            d='M46.432 82.518c-.521-7.799.328-15.51 5.6-21.665 2.863-3.342 7.254-6.376 11.448-7.786 2.243-.755 5.09-.661 4.287 2.566-.464 1.859-2.026 3.44-3.174 4.879-2.076 2.605-4.198 5.175-6.238 7.81-3.246 4.188-9.687 9.382-11.923 14.196Z'
          />
        </G>
        <Path
          fill='#FAD8BA'
          fillRule='evenodd'
          d='m77.686 30.345-4.954.31c.363 1.945.154 3.742-.57 5.404 4.171 6.88 6.831 6.558 7.016-.597-2.166-1.336-1.918-3.35-1.492-5.117Z'
          clipRule='evenodd'
        />
        <Mask
          id='i'
          width={8}
          height={12}
          x={72}
          y={30}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='m77.686 30.345-4.954.31c.363 1.945.154 3.742-.57 5.404 4.171 6.88 6.831 6.558 7.016-.597-2.166-1.336-1.918-3.35-1.492-5.117Z'
          />
        </Mask>
        <G mask='url(#i)'>
          <Path
            fill='#D7B699'
            fillRule='evenodd'
            d='M78.272 32.899a8.047 8.047 0 0 1-1.86 2.229c-.56.459-1.18.894-1.83 1.206-.603.289-1.296.512-1.969.405-1.378-.216-2.052-1.759-1.98-3.027.15-2.67 2.809-4.88 5.438-4.13.813.231 1.626 2.702 2.2 3.317Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#FAD8BA'
          fillRule='evenodd'
          d='M74.772 22.49c2.433 0 4.406 2.3 4.406 5.135 0 2.834-.318 6.108-2.75 6.108-2.433 0-6.061-3.274-6.061-6.108 0-2.835 1.973-5.136 4.405-5.136Z'
          clipRule='evenodd'
        />
        <Path
          fill='#03222F'
          fillRule='evenodd'
          d='M73.706 26.67c2.496 1.412 7.56 1.68 8.138-2.024.11-.706.018-1.409-.128-2.102.724-.015 1.314-.537 1.76-1.069 1.058-1.262 1.553-3.275.585-4.726-.858-1.284-2.446-1.756-3.918-1.73-2.99.054-5.567 1.78-7.277 4.157-.29-.201-.712-.064-1.013.034-.897.291-1.707.853-2.413 1.468-2.726 2.364-3.918 5.893-2.967 9.387-.453-.173-1.228.229-1.62.403-1.544.686-2.956 1.707-4.198 2.848-1.82 1.672-3.328 3.804-3.992 6.213-.971 3.53.152 8.375 3.569 10.228-.078 1.789 2.785 2.48 4.078 2.44a6.547 6.547 0 0 0 1.135-.14c2.699-.563 5.026-2.513 5.234-5.397.066-.911-.101-1.805-.36-2.674.935-.182 1.829-1.045 2.404-1.747 1.966-2.404 3.16-4.913 1.442-7.46.488-.103.866-1 1.048-1.381.73-1.523-1.2-5.068-1.507-6.728Z'
          clipRule='evenodd'
        />
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M181.216 125.545c-.158-2.048-.839-4.086-1.484-6.021-1.722-5.149-4.202-9.772-8.597-13.093-2.135-1.612-5.031-3.123-7.8-2.742-1.311.18-2.774.94-2.709 2.462.113 2.72 3.363 4.845 5.35 6.168 4.853 3.232 13.863 6.734 15.24 13.226Z'
          clipRule='evenodd'
        />
        <Mask
          id='j'
          width={22}
          height={23}
          x={160}
          y={103}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M181.216 125.545c-.158-2.048-.839-4.086-1.484-6.021-1.722-5.149-4.202-9.772-8.597-13.093-2.135-1.612-5.031-3.123-7.8-2.742-1.311.18-2.774.94-2.709 2.462.113 2.72 3.363 4.845 5.35 6.168 4.853 3.232 13.863 6.734 15.24 13.226Z'
          />
        </Mask>
        <G mask='url(#j)'>
          <Path
            fill='#477282'
            fillRule='evenodd'
            d='M161.817 102.29c-.372.93-.214 2.031-.022 2.981.172.857.411 1.729.851 2.489 1.593 2.747 4.944 3.902 7.91 4.354 1.34.205 3.487.341 4.537-.764.722-.76.2-1.492.157-2.345-.01-.226.168-.28.358-.223 1.025.302 1.904 1.768 2.454 2.583 1.651 2.456 2.705 5.429 3.141 8.352.153 1.029.382 2.468-.279 3.378-.829 1.145-2.715.269-3.676-.182a26.925 26.925 0 0 1-.833-.416 40.671 40.671 0 0 1-2.39-1.352c-2.905-1.743-16.785-8.984-18.614-12.409-1.908-3.576 3.108-5.233 6.406-6.446Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M182.708 125.545c.157-2.048.838-4.086 1.483-6.021 1.722-5.149 4.202-9.772 8.597-13.093 2.135-1.612 5.032-3.123 7.8-2.742 1.312.18 2.775.94 2.709 2.462-.113 2.72-3.363 4.845-5.349 6.168-4.853 3.232-13.864 6.734-15.24 13.226Z'
          clipRule='evenodd'
        />
        <Mask
          id='k'
          width={22}
          height={23}
          x={182}
          y={103}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M182.708 125.545c.157-2.048.838-4.086 1.483-6.021 1.722-5.149 4.202-9.772 8.597-13.093 2.135-1.612 5.032-3.123 7.8-2.742 1.312.18 2.775.94 2.709 2.462-.113 2.72-3.363 4.845-5.349 6.168-4.853 3.232-13.864 6.734-15.24 13.226Z'
          />
        </Mask>
        <G mask='url(#k)'>
          <Path
            fill='#477282'
            fillRule='evenodd'
            d='M202.106 102.29c.372.93.215 2.031.022 2.981-.172.857-.411 1.729-.85 2.489-1.594 2.747-4.945 3.902-7.911 4.354-1.339.205-3.487.341-4.537-.764-.722-.76-.2-1.492-.157-2.345.011-.226-.168-.28-.357-.223-1.026.302-1.905 1.768-2.455 2.583-1.651 2.456-2.705 5.429-3.14 8.352-.154 1.029-.383 2.468.278 3.378.829 1.145 2.716.269 3.677-.182.278-.133.557-.273.832-.416a40.671 40.671 0 0 0 2.39-1.352c2.905-1.743 16.785-8.984 18.614-12.409 1.908-3.576-3.108-5.233-6.406-6.446Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M180.566 124.532c.103-3.856.343-8.005-.099-11.985-.422-3.768-1.455-7.386-3.929-10.391-2.678-3.259-6.497-5.303-9.917-7.68-3.807-2.648-7.14-5.678-8.422-10.676a13.336 13.336 0 0 1-.387-4.62c.162-1.652.707-3.244 1.436-4.733a1.441 1.441 0 0 1 1.933-.658 1.45 1.45 0 0 1 .655 1.94c-.576 1.176-1.022 2.43-1.152 3.735-.118 1.211.004 2.435.308 3.612 1.097 4.258 4.028 6.763 7.274 9.019 3.633 2.526 7.653 4.753 10.501 8.216 5.535 6.734 4.904 16.123 4.687 24.298a1.445 1.445 0 1 1-2.888-.077Z'
          clipRule='evenodd'
        />
        <Mask
          id='l'
          width={27}
          height={54}
          x={157}
          y={73}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M180.566 124.532c.103-3.856.343-8.005-.099-11.985-.422-3.768-1.455-7.386-3.929-10.391-2.678-3.259-6.497-5.303-9.917-7.68-3.807-2.648-7.14-5.678-8.422-10.676a13.336 13.336 0 0 1-.387-4.62c.162-1.652.707-3.244 1.436-4.733a1.441 1.441 0 0 1 1.933-.658 1.45 1.45 0 0 1 .655 1.94c-.576 1.176-1.022 2.43-1.152 3.735-.118 1.211.004 2.435.308 3.612 1.097 4.258 4.028 6.763 7.274 9.019 3.633 2.526 7.653 4.753 10.501 8.216 5.535 6.734 4.904 16.123 4.687 24.298a1.445 1.445 0 1 1-2.888-.077Z'
          />
        </Mask>
        <G mask='url(#l)'>
          <Path
            fill='#477282'
            fillRule='evenodd'
            d='M165.614 71.74c-2.19 1.8-3.031 12.872-4.613 15.187-.375.554-.953 2.722-1.707 2.846-.584.095-1.084-.756-1.331-1.151-.882-1.398-1.369-3.094-1.791-4.676-1.098-4.078-1.703-8.991-.468-13.1.206-.695.485-1.394.874-2.007 1.705-2.673 4.814-1.328 6.683.347.863.775 1.627 1.647 2.353 2.554Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#F29F05'
          d='M163.327 82.834c-7.482 0-13.547-6.089-13.547-13.599s6.065-13.599 13.547-13.599 13.547 6.089 13.547 13.6c0 7.51-6.065 13.598-13.547 13.598Z'
        />
        <Mask
          id='m'
          width={28}
          height={28}
          x={149}
          y={55}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M163.327 82.834c-7.482 0-13.547-6.089-13.547-13.599s6.065-13.599 13.547-13.599 13.547 6.089 13.547 13.6c0 7.51-6.065 13.598-13.547 13.598Z'
          />
        </Mask>
        <G mask='url(#m)'>
          <Path
            fill='#D98A00'
            fillRule='evenodd'
            d='M152.283 58.581c-1.351 6.692-.919 14.78 5.169 19.044a15.285 15.285 0 0 0 3.773 1.911c3.366 1.155 7.403 1.137 10.633-.434.95-.459 1.854-1.043 2.622-1.771.483-.456.961-1.216 1.562-1.514.596-.297.761.463.725.893-.129 1.621-1.222 3.228-2.205 4.447-3.78 4.695-10.021 6.072-15.659 4.243-9.722-3.152-14.809-17.91-6.62-26.819Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#F29F05'
          fillRule='evenodd'
          d='m186.767 47.032 1.165 5.304-4.683 2.724 5.285-1.17 2.714 4.698-1.165-5.304 4.678-2.722-5.28 1.169-2.714-4.699ZM175.861 51.806l.683 3.114-2.749 1.6 3.103-.688 1.593 2.758-.683-3.114 2.746-1.598-3.1.686-1.593-2.758ZM182.619 59.442l.684 3.113-2.749 1.6 3.102-.688 1.594 2.759-.684-3.114 2.746-1.598-3.1.686-1.593-2.758Z'
          clipRule='evenodd'
        />
        <Path
          fill='#fff'
          d='M166.043 71.103c-.25-.435-.569-.712-.957-.829-.388-.118-.932-.12-1.634-.002-.699.115-1.32.187-1.861.214a5.438 5.438 0 0 1-1.499-.117 3.405 3.405 0 0 1-1.261-.578c-.384-.28-.724-.68-1.023-1.2-.515-.895-.652-1.794-.411-2.697.241-.904.806-1.676 1.697-2.32l-.979-1.701 1.267-.734.992 1.725c1.012-.41 1.969-.443 2.87-.1.901.344 1.649 1.032 2.244 2.066l-2.289 1.327c-.366-.636-.772-1.036-1.213-1.2-.443-.164-.884-.119-1.322.135-.433.25-.697.569-.793.953-.097.384-.019.793.231 1.228.232.403.533.66.907.768.372.11.947.108 1.724-.003a16.551 16.551 0 0 1 1.971-.182 5.196 5.196 0 0 1 1.469.166 3.4 3.4 0 0 1 1.199.598c.357.278.674.657.951 1.14.519.901.659 1.795.423 2.681-.237.886-.818 1.665-1.741 2.334l.91 1.583-1.26.73-.905-1.575c-1.151.511-2.21.611-3.181.301-.971-.31-1.769-1.009-2.394-2.095l2.29-1.327c.363.63.79 1.028 1.282 1.191.492.164 1.018.084 1.578-.24.464-.27.76-.605.888-1.009.128-.402.071-.813-.17-1.231Z'
        />
        <Path
          fill='#6993A4'
          fillRule='evenodd'
          d='M182.143 110.836c-1.881 2.141-2.822-.125-.795-2.66 1.92-2.399.948-3.296 1.255-6.444.335-3.413-.679-6.789-1.274-10.125-.661-3.715-.832-7.375 1.299-10.977a10.758 10.758 0 0 1 2.428-2.868c1.039-.852 2.264-1.449 3.535-1.88a1.175 1.175 0 0 1 .746 2.229c-1.004.34-1.978.8-2.8 1.473a8.42 8.42 0 0 0-1.895 2.245c-1.813 3.07-1.571 6.198-1.006 9.365.631 3.544 1.655 7.141 1.301 10.769-.408 4.147-.11 5.817-2.794 8.873Z'
          clipRule='evenodd'
        />
        <Mask
          id='n'
          width={11}
          height={37}
          x={180}
          y={75}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M182.143 110.836c-1.881 2.141-2.822-.125-.795-2.66 1.92-2.399.948-3.296 1.255-6.444.335-3.413-.679-6.789-1.274-10.125-.661-3.715-.832-7.375 1.299-10.977a10.758 10.758 0 0 1 2.428-2.868c1.039-.852 2.264-1.449 3.535-1.88a1.175 1.175 0 0 1 .746 2.229c-1.004.34-1.978.8-2.8 1.473a8.42 8.42 0 0 0-1.895 2.245c-1.813 3.07-1.571 6.198-1.006 9.365.631 3.544 1.655 7.141 1.301 10.769-.408 4.147-.11 5.817-2.794 8.873Z'
          />
        </Mask>
        <G mask='url(#n)'>
          <Path
            fill='#477282'
            fillRule='evenodd'
            d='M193.787 78.01c-2.286-.235-9.114 5.617-11.347 6.028-.532.1-2.106 1.008-2.609.643-.388-.283-.186-1.059-.101-1.428.296-1.31.99-2.562 1.655-3.71 1.709-2.97 4.18-6.13 7.242-7.77.516-.278 1.077-.517 1.65-.644 2.509-.546 3.518 2.02 3.627 4.059.05.942-.013 1.883-.117 2.821Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#F29F05'
          d='M186.116 83.038c-4.282-4.322-4.264-11.31.042-15.61a10.966 10.966 0 0 1 15.55.041c4.283 4.322 4.265 11.31-.041 15.61a10.967 10.967 0 0 1-15.551-.041Z'
        />
        <Mask
          id='o'
          width={23}
          height={23}
          x={182}
          y={64}
          maskUnits='userSpaceOnUse'
          style={{
            maskType: 'luminance'
          }}
        >
          <Path
            fill='#fff'
            d='M186.116 83.038c-4.282-4.322-4.264-11.31.042-15.61a10.966 10.966 0 0 1 15.55.041c4.283 4.322 4.265 11.31-.041 15.61a10.967 10.967 0 0 1-15.551-.041Z'
          />
        </Mask>
        <G mask='url(#o)'>
          <Path
            fill='#D98A00'
            fillRule='evenodd'
            d='M193.699 62.774c-4.61 3.05-8.999 7.93-7.958 13.888.202 1.135.56 2.237 1.064 3.273 1.264 2.605 3.585 4.927 6.335 5.894.807.286 1.659.473 2.517.5.537.018 1.247-.14 1.761.036.512.174.17.704-.097.93-1.003.854-2.55 1.142-3.811 1.272-4.855.504-9.218-2.313-11.396-6.617-3.758-7.42 1.79-18.806 11.585-19.176Z'
            clipRule='evenodd'
          />
        </G>
        <Path
          fill='#fff'
          d='M194.397 77.893c.106-.393.082-.736-.073-1.027-.154-.292-.465-.607-.934-.945a13.604 13.604 0 0 1-1.188-.953 4.443 4.443 0 0 1-.792-.933 2.813 2.813 0 0 1-.39-1.06c-.059-.38-.025-.806.102-1.276.219-.81.656-1.405 1.312-1.782.656-.378 1.422-.494 2.301-.348l.415-1.539 1.146.311-.421 1.561c.814.35 1.38.884 1.699 1.601.319.717.353 1.544.101 2.479l-2.071-.563c.155-.576.152-1.038-.006-1.388-.16-.35-.439-.578-.834-.686-.392-.106-.726-.077-1.001.087-.276.165-.466.444-.572.837-.098.364-.073.685.079.963.151.278.48.61.989.995s.92.73 1.232 1.033c.313.304.561.619.746.944.182.32.299.671.344 1.036.045.365.009.765-.109 1.201-.22.816-.653 1.409-1.295 1.78-.644.37-1.423.48-2.335.33l-.386 1.431-1.14-.31.384-1.424c-.951-.372-1.615-.927-1.993-1.665-.378-.738-.434-1.599-.169-2.582l2.071.563c-.154.57-.137 1.045.051 1.423.188.378.535.635 1.042.773.42.114.781.093 1.086-.064.304-.156.507-.424.609-.803Z'
        />
        <Path
          fill='#03222F'
          fillRule='evenodd'
          d='M170.582 124.772H7.284v1.077h163.298v-1.077ZM193.529 124.907h-17.496v1.144h17.496v-1.144Z'
          clipRule='evenodd'
        />
      </Svg>
    </View>
  )
}