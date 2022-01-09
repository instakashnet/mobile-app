import React, { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Alert } from "react-native";

// HELPERS
import { getVariables } from "../../../variables";

// ASSETS
import { GoogleIcon } from "../../../assets/icons/google";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";

export const GoogleButton = ({ loginGoogle }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "836395718088-lehca6774i6v9d0shlo9b9ich8seeoeb.apps.googleusercontent.com",
    androidClientId: "836395718088-smvqt6vip76e66sd852be6pkgjuth9sf.apps.googleusercontent.com",
    iosClientId: "836395718088-ehkp8sf0hud9h5h5ain3b31g9aan2rf4.apps.googleusercontent.com",
  });

  // EFFECTS
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      loginGoogle(authentication.accessToken);
    }
  }, [response]);

  const onGoogleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      Alert.alert("Error", "Ha ocurrido un error con el servicio de google.");
    }
  };
  return (
    <Button icon={() => <GoogleIcon />} disabled={!request} variant="secondary" onPress={onGoogleLogin}>
      Ingresar con Google
    </Button>
  );
};
