import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export const KeyboardView = ({ offset = 0, children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, width: "100%", alignItems: "center" }} keyboardVerticalOffset={offset} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {children}
    </KeyboardAvoidingView>
  );
};
