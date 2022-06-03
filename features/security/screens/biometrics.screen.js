import { Link, useFocusEffect } from "@react-navigation/native";
import { supportedAuthenticationTypesAsync } from "expo-local-authentication";
import React, { useCallback, useState } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/UI/button.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { deleteFromStore, getFromStore, saveInStore } from "../../../shared/helpers/async-store";
import { setIsBiometricsValues } from "../../../store/actions";
import { Container, ImageWrapper } from "../components/biometrics.styles";

const BiometricsScreen = () => {
  const dispatch = useDispatch(),
    [isBiometrics, setIsBiometrics] = useState(false),
    [biometricsTypes, setBiometricsTypes] = useState([]),
    { user, isProcessing } = useSelector((state) => state.authReducer);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const types = await supportedAuthenticationTypesAsync();
        setBiometricsTypes(types);
        const granted = await getFromStore("biometricsGranted");

        setIsBiometrics(granted);
      })();
    }, [])
  );

  const handleEnableBiometrics = () => dispatch(setIsBiometricsValues(user, setIsBiometrics));

  const handleDisableBiometrics = async () => {
    try {
      await saveInStore("biometricsGranted", false);
      await deleteFromStore("biometricsValues");

      setIsBiometrics(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea>
      <Container>
        <Spacer variant="top" size={5} />
        <Text variant="title">Autenticación biométrica</Text>
        <ImageWrapper>
          <Image
            source={
              biometricsTypes.find((b) => b === 2)
                ? require("../../../assets/illustrations/security/face-id.png")
                : require("../../../assets/illustrations/security/fingerprint.png")
            }
            style={{ width: 225, height: 225 }}
          />
          {!isBiometrics && <Text variant="bold">Habilita la verificación biométrica para iniciar sesión de forma rápida.</Text>}
        </ImageWrapper>
        <Text>Tu información biométrica solo será recolectada de forma local por Instakash para ofrecerte un inicio sesión rápido y ningún otro propósito.</Text>
        <Spacer variant="top" size={2} />
        <Button onPress={isBiometrics ? handleDisableBiometrics : handleEnableBiometrics} loading={isProcessing}>
          {isBiometrics ? "Deshabilitar" : "Habilitar"}
        </Button>
        {!isBiometrics && (
          <Link to={{ screen: "Home" }}>
            <Text variant="underline">Lo hago despues</Text>
          </Link>
        )}
      </Container>
    </SafeArea>
  );
};

export default BiometricsScreen;
