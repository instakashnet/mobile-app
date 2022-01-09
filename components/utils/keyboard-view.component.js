import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export const KeyboardView = ({ offset = 0, children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={offset} behavior={"height"}>
      {children}
    </KeyboardAvoidingView>
  );
};
