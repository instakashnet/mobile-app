import * as AppleAuthentication from "expo-apple-authentication";
import { useEffect, useState } from "react";
import { AppleIcon } from "../../../assets/icons/apple";
import { Button } from "../../../components/UI/button.component";

export const AppleButton = ({ onPress }) => {
  const [appleSignInAvailable, setAppleSignInAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();

      setAppleSignInAvailable(isAvailable);
    })();
  }, []);

  return appleSignInAvailable ? (
    <Button variant="black" icon={() => <AppleIcon />} labelStyle={{ color: "#FFF" }} onPress={onPress}>
      Continuar con apple
    </Button>
  ) : null;
};
