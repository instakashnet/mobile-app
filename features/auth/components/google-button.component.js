import React from "react";
import * as Google from "expo-auth-session/providers/google";
import { Alert } from "react-native";

// HELPERS
import { getVariables } from "../../../variables";

import { loginGoogle } from "../../../store/actions";

// ASSETS
import { GoogleIcon } from "../../../assets/icons/google";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";

const { googleSinInAndroid, googleSinInExpo, googleSinInIos } = getVariables();

export const GoogleButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleSinInExpo,
    androidClientId: googleSinInAndroid,
    iosClientId: googleSinInIos,
  });

  // EFFECTS
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      dispatch(loginGoogle(authentication.accessToken));
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
