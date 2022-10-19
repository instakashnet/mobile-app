import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Dimensions, Modal, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { HelperText } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme, error }) => (error ? theme.space[0] : theme.space[2])};
  position: relative;
`;

const PickerIcon = styled(Ionicons).attrs({
  name: "ios-caret-down-sharp",
  size: 13,
  color: "#444",
})`
  position: absolute;
  right: 11px;
  top: 20px;
  z-index: 10;
`;

const ModalContent = styled.View`
  height: ${Dimensions.get("screen").height / 3}px;
  margin-top: auto;
  background-color: #ddd;
`;

const InputIOS = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  height: 50px;
  border-width: ${({ error }) => (error ? 2 : 1)}px;
  border-color: ${({ theme, error }) => (error ? theme.colors.ui.error : theme.colors.ui.border)};
  background-color: #fff;
  border-radius: 4px;
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[3]};
  flex-direction: row;
  align-items: center;
`;

const InputAndroid = styled.View`
  height: 51px;
  border-width: ${({ error }) => (error ? 2 : 1)}px;
  border-color: ${({ theme, error }) => (error ? theme.colors.ui.error : theme.colors.ui.border)};
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  justify-content: center;
`;

export const Select = ({ label, value, onChange, name, options, error, isFlex }) => {
  const [pickerShown, setPickerShown] = useState(false);

  return (
    <>
      <FormGroup error={!!error}>
        {Platform.OS === "ios" ? (
          <>
            <InputIOS error={!!error} onPress={() => setPickerShown(true)}>
              <Text>{!value ? label : options.find((o) => o.value === value).label}</Text>
            </InputIOS>
            <PickerIcon onPress={() => setPickerShown(true)} />
          </>
        ) : (
          <InputAndroid>
            <Picker style={{ backgroundColor: "transparent", height: 48, width: "100%" }} selectedValue={value} onValueChange={(value) => onChange(name, value)}>
              <Picker.Item label={label} value="" enabled={false} color="#888" />
              {options.map((o) => (
                <Picker.Item key={o.value} label={o.label} value={o.value} />
              ))}
            </Picker>
          </InputAndroid>
        )}

        {!!error && !isFlex && (
          <HelperText style={{ textAlign: "left" }} type="error" visible={!!error}>
            {error}
          </HelperText>
        )}
      </FormGroup>
      <Modal
        transparent
        animationType="slide"
        visible={pickerShown}
        onRequestClose={() => {
          setPickerShown(false);
        }}
      >
        <TouchableOpacity activeOpacity={1} onPressOut={() => setPickerShown(false)} style={{ flex: 1 }}>
          <TouchableWithoutFeedback>
            <ModalContent>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#EEE",
                  borderWidth: 1,
                  borderColor: "#DDD",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableWithoutFeedback onPress={() => setPickerShown(false)}>
                  <Text variant="subtitle" style={{ color: "#006ee6" }}>
                    Cerrar
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <Picker selectedValue={value} onValueChange={(value) => onChange(name, value)}>
                <Picker.Item label={label} value="" enabled={false} style={{ opacity: 0.75 }} />
                {options.map((o) => (
                  <Picker.Item key={o.value} label={o.label} value={o.value} />
                ))}
              </Picker>
            </ModalContent>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
