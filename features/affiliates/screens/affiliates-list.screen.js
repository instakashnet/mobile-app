import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

// ASSETS
import { Kash } from "../../../assets/illustrations/money/kash";
import { KashGray } from "../../../assets/illustrations/money/kash-gray";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAffiliates, getKashAccount } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { AffiliatesTable } from "../components/affiliates-table.component";
import { Loader } from "../../../components/UI/loader.component";

// STYLED COMPONENTS
import { AffiliatesScroll, Card, Number, Subtitle, AffiliatesInfo } from "../components/affiliates.styles";

export const AffiliatesListScreen = () => {
  const dispatch = useDispatch(),
    affiliates = useSelector((state) => state.authReducer.affiliates),
    { isLoading, kashBalance } = useSelector((state) => state.accountsReducer),
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
      dispatch(getKashAccount());
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
      {isLoading && <Loader />}
      <AffiliatesScroll>
        <Spacer variant="top" />
        <Text variant="title">Mis referidos</Text>
        <Text numberOfLines={3} style={{ paddingHorizontal: 10 }}>
          Recuerda que ganas Kash cada vez que tus amigos se registran con tu c??digo y completan su primer cambio.
        </Text>
        <Spacer variant="top" size={3} />
        <AffiliatesTable columns={columns} rows={rows} />
        <Spacer variant="top" size={5} />
        <Text variant="subtitle" style={{ color: "#676767" }}>
          Mientras m??s invites m??s KASH ganar??s
        </Text>
        <Spacer variant="top" size={3} />
        <AffiliatesInfo>
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
            <Number>{kashBalance || 0}</Number>
            <Subtitle>Kash ganados</Subtitle>
          </Card>
        </AffiliatesInfo>
      </AffiliatesScroll>
    </SafeArea>
  );
};
