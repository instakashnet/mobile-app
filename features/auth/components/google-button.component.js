import * as Google from "expo-auth-session/providers/google";
import React, { useEffect } from "react";
import { Alert } from "react-native";
// ASSETS
import { GoogleIcon } from "../../../assets/icons/google";
// COMPONENTS
import { Button } from "../../../components/UI/button.component";

export const GoogleButton = ({ loginGoogle }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "638094177367-34hn531ql7iij56qrj6r812idrjeisl2.apps.googleusercontent.com",
    androidClientId: "638094177367-9s0qdgi795pev8b6f17cq2sq34em1qfb.apps.googleusercontent.com",
    iosClientId: "638094177367-8jp983jgbcd4mc5v31617d95u8sgtfsc.apps.googleusercontent.com",
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
      Continuar con google
    </Button>
  );
};
