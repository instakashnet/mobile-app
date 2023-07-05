import { View } from 'react-native'
import React, { Fragment } from 'react'
import { Text } from 'react-native-paper'

export default function StepsBar({ activeStep, steps }) {
  return (
    <View className="flex-row items-center justify-center w-full">
      {steps.map(({ label, Icon }, index) => (
        <Fragment key={label}>
          <View className="items-center">
            <View
              className="w-[40px] h-[40px] border-[1px] rounded-full items-center justify-center"
              style={{
                borderColor: activeStep === index + 1 || activeStep > index + 1 ? '#0a686a' : '#b0b0b0',
                backgroundColor: activeStep > index + 1 ? '#0a686a' : 'transparent',
              }}>
              {Icon ? (
                <Icon
                  active={activeStep === index + 1}
                  color={activeStep > index + 1 ? '#fff' : activeStep === index + 1 ? '#0a686a' : '#b0b0b0'}
                />
              ) : (
                <Text variant="button" className="text-gray-400 text-[16px]">
                  {index + 1}
                </Text>
              )}
            </View>
            <Text variant="caption" className="text-gray-600">
              {label}
            </Text>
          </View>
          {index + 1 < steps.length ? <View className="w-[15%] h-[1px] bg-gray-400 mx-2" /> : null}
        </Fragment>
      ))}
    </View>
  )
}
