import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerBackLeft, headerRight, headerTitle } from "../utils/navigator.options";

// SCREENS
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { BasicInfoScreen } from "../../features/profile/screens/information/basic-info.screen";
import { EditInfoScreen } from "../../features/profile/screens/information/edit-info.screen";
import { DocumentInfoScreen } from "../../features/profile/screens/document/document-info.screen";
import { DocumentUploadScreen } from "../../features/profile/screens/document/document-upload.screen";
import { CameraScreen } from "../../features/profile/screens/document/camera.screen";
import { AdditionalInfoScreen } from "../../features/profile/screens/information/additional-info.screen";
import { EditAdditionalScreen } from "../../features/profile/screens/information/edit-additional.screen";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft: () => headerBackLeft(navigation),
        headerRight,
      })}
    >
      <ProfileStack.Screen name="MyProfile" options={{ headerTitle: () => headerTitle("Mi perfil") }} component={ProfileScreen} />
      <ProfileStack.Screen name="BasicInfo" options={{ headerTitle: () => headerTitle("Información básica") }} component={BasicInfoScreen} />
      <ProfileStack.Screen name="EditInfo" options={{ headerTitle: () => headerTitle("Editar información") }} component={EditInfoScreen} />
      <ProfileStack.Screen name="DocumentInfo" options={{ headerTitle: () => headerTitle("Documento") }} component={DocumentInfoScreen} />
      <ProfileStack.Screen name="DocumentUpload" options={{ headerTitle: () => headerTitle("Cargar documento") }} component={DocumentUploadScreen} />
      <ProfileStack.Screen name="Camera" options={{ headerTitle: "", headerRight: null }} component={CameraScreen} />
      <ProfileStack.Screen name="AdditionalInfo" options={{ headerTitle: () => headerTitle("Información adicional") }} component={AdditionalInfoScreen} />
      <ProfileStack.Screen name="EditAdditionals" options={{ headerTitle: () => headerTitle("Editar información") }} component={EditAdditionalScreen} />
    </ProfileStack.Navigator>
  );
};
