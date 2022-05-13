import React from "react";
import StepIndicator from "react-native-step-indicator";

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#0D8284",
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: "#0D8284",
  stepStrokeUnFinishedColor: "#676767",
  separatorFinishedColor: "#0D8284",
  separatorUnFinishedColor: "#0D8284",
  stepIndicatorFinishedColor: "#0D8284",
  stepIndicatorUnFinishedColor: "#F8FAFB",
  stepIndicatorCurrentColor: "#0D8284",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#676767",
  labelColor: "#676767",
  labelSize: 13,
  labelFontFamily: "lato-bold",
  currentStepLabelColor: "#0D8284",
};

export const ProgressIndicator = ({ labels, currentPos }) => {
  return <StepIndicator customStyles={customStyles} currentPosition={currentPos} labels={labels} stepCount={labels.length || 0} />;
};
