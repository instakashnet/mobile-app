import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// REDUX
import { useSelector } from "react-redux";
import { CameraScreen } from "../../features/profile/screens/document/camera.screen";
import { DocumentInfoScreen } from "../../features/profile/screens/document/document-info.screen";
import { DocumentTypeScreen } from "../../features/profile/screens/document/document-type.screen";
import { DocumentUploadedScreen } from "../../features/profile/screens/document/document-uploaded.screen";
import { DocumentValidationScreen } from "../../features/profile/screens/document/document-validation.screen";
import { AdditionalInfoScreen } from "../../features/profile/screens/information/additional-info.screen";
import { BasicInfoScreen } from "../../features/profile/screens/information/basic-info.screen";
import { EditAdditionalScreen } from "../../features/profile/screens/information/edit-additional.screen";
import { EditInfoScreen } from "../../features/profile/screens/information/edit-info.screen";
// SCREENS
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
// UTILS
import { headerBackLeft, headerOptions, headerRight, headerTitle } from "../utils/navigator.options";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  const { identityDocumentValidation } = useSelector((state) => state.authReducer.user);

  return (
    <ProfileStack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft: () => headerBackLeft(navigation),
        headerRight,
      })}
      initialRouteName="MyProfile"
    >
      <ProfileStack.Screen name="MyProfile" options={{ headerTitle: () => headerTitle("Mi perfil") }} component={ProfileScreen} />
      <ProfileStack.Screen name="BasicInfo" options={{ headerTitle: () => headerTitle("Información básica") }} component={BasicInfoScreen} />
      <ProfileStack.Screen name="EditInfo" options={{ headerTitle: () => headerTitle("Editar información") }} component={EditInfoScreen} />
      <ProfileStack.Screen
        name="ValidateDocument"
        options={{ headerTitle: () => headerTitle("Verificar identidad") }}
        component={identityDocumentValidation === "pending" ? DocumentValidationScreen : DocumentTypeScreen}
      />
      <ProfileStack.Screen name="DocumentInfo" options={{ headerTitle: () => headerTitle("Cargar documento") }} component={DocumentInfoScreen} />
      <ProfileStack.Screen name="Camera" options={{ headerShown: false }} component={CameraScreen} />
      <ProfileStack.Screen name="DocumentUploaded" options={{ headerTitle: "", headerLeft: null }} component={DocumentUploadedScreen} />
      <ProfileStack.Screen name="AdditionalInfo" options={{ headerTitle: () => headerTitle("Información adicional") }} component={AdditionalInfoScreen} />
      <ProfileStack.Screen name="EditAdditionals" options={{ headerTitle: () => headerTitle("Editar información") }} component={EditAdditionalScreen} />
    </ProfileStack.Navigator>
  );
};
