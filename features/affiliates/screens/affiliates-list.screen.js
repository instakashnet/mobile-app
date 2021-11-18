import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

// ASSETS
import { Kash } from "../../../assets/illustrations/kash";
import { KashGray } from "../../../assets/illustrations/kash-gray";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAffiliates } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { AffiliatesTable } from "../components/affiliates-table.component";
import { AffiliatesScroll, Card, Number, Subtitle } from "../components/affiliates.styles";
import { View } from "react-native";

export const AffiliatesListScreen = () => {
  const dispatch = useDispatch(),
    affiliates = useSelector((state) => state.authReducer.affiliates),
    [total, setTotal] = useState(0),
    [completed, setCompleted] = useState(0),
    [notCompleted, setNotCompleted] = useState(0),
    columns = [{ title: "Nombre" }, { title: "Estado" }, { title: "Recompensa" }],
    rows = affiliates.map((a) => ({
      name: (
        <Text variant="bold" style={{ color: "#AFAFAF" }}>
          {String(a.firstName.split(" ")[0]).toLowerCase()} {String(a.lastName.split(" ")[0]).toLowerCase()}
        </Text>
      ),
      status: a.orderSuccess ? "completado" : "registrado",
      reward: a.orderSuccess ? <Kash /> : <KashGray />,
    }));

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getAffiliates());
    }, [dispatch])
  );

  useEffect(() => {
    if (affiliates.length) setTotal(affiliates.length);
  }, [affiliates]);

  useEffect(() => {
    if (total > 0) {
      let completedAffiliates = affiliates.filter((a) => a.orderSuccess);
      let notCompletedAffiliates = affiliates.filter((a) => !a.orderSuccess);
      let completedPercentage = (+completedAffiliates.length / +total) * 100;
      setCompleted(completedPercentage);
      setNotCompleted(notCompletedAffiliates.length);
    }
  }, [total, affiliates]);

  return (
    <SafeArea>
      <AffiliatesScroll>
        <Spacer variant="top" size={3} />
        <Text variant="title">Mis referidos</Text>
        <Text style={{ paddingHorizontal: 20 }}>Recuerda que ganas Kash cada vez que tus amigos se registran con tu código y completan su primer cambio.</Text>
        <Spacer variant="top" size={3} />
        <AffiliatesTable columns={columns} rows={rows} />
        <Spacer variant="top" size={5} />
        <Text variant="subtitle" style={{ color: "#676767" }}>
          Mientras más invites <Text variant="bold">más KASH ganarás</Text>
        </Text>
        <Spacer variant="top" size={3} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <Card>
            <Number>{total}</Number>
            <Subtitle>Invitados</Subtitle>
          </Card>
          <Card>
            <Number>{notCompleted}</Number>
            <Subtitle>Sin completar</Subtitle>
          </Card>
          <Card>
            <Number>{completed}%</Number>
            <Subtitle>Completados</Subtitle>
          </Card>
          <Card>
            <Number>{completed}</Number>
            <Subtitle>Kash ganados</Subtitle>
          </Card>
        </View>
      </AffiliatesScroll>
    </SafeArea>
  );
};
