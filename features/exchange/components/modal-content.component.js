import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TimeBellIcon } from "../../../assets/icons/time-bell";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/UI/button.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const ModalContent = ({ modalType, navigate, onGetRates, onClose }) => {
  return modalType === "timeout" ? (
    <>
      <TimeBellIcon />
      <Text variant="subtitle">¡Se acabó el tiempo!</Text>
      <Spacer variant="top" />
      <Text style={{ textAlign: "center" }}>Los 5 minutos de cambio garantizado han finalizado. El tipo de cambio se actualizará y puede haber variado.</Text>
      <Spacer variant="top" size={2} />
      <Button onPress={onGetRates}>Aceptar</Button>
    </>
  ) : modalType === "profile" ? (
    <>
      <MaterialCommunityIcons name="information" size={50} color="#EB9824" />
      <Spacer variant="top" size={2} />
      <Text variant="bold" style={{ textAlign: "center" }}>
        Debes completar tu perfil al 100% para poder realizar operaciones mayores a 1000 USD.
      </Text>
      <Spacer variant="top" />
      <Button onPress={() => navigate("Profile")}>Completar perfil</Button>
    </>
  ) : modalType === "closed" ? (
    <>
      <MaterialCommunityIcons name="clock-alert-outline" size={50} color="#0D8284" />
      <Spacer variant="top" />
      <Text variant="subtitle">Ingreso fuera de horario</Text>
      <Spacer variant="top" />
      <Text style={{ textAlign: "center" }}>
        Estás ingresando fuera de nuestro horario laboral. Puedes registrar tus operaciones, pero tu cambio se efectuará dentro del siguiente horario:
      </Text>
      <Spacer variant="top" size={2} />
      <Text variant="bold">Lunes a Viernes: 9AM a 7PM</Text>
      <Text variant="bold">Sábados: 9AM a 2PM</Text>
      <Text variant="bold">Domingos y Feriados Cerrados</Text>
      <Spacer variant="top" size={2} />
      <Button onPress={onClose}>Aceptar</Button>
    </>
  ) : null;
};
