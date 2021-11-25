import React, { useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { Share, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Button } from "../../../components/UI/button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { SlideItem } from "../../../components/UI/slide-item.component";
import { AffiliatesScroll, CodeWrapper, ButtonsWrapper } from "../components/affiliates.styles";

export const AffiliateCodeScreen = ({ navigation }) => {
  const carousel = useRef(),
    user = useSelector((state) => state.authReducer.user),
    [slider] = useState({
      index: 0,
      items: [
        {
          title: "1. Comparte tu código con amigos",
          image: require("../../../assets/illustrations/share-social.png"),
          component: <Text>Copia tu código de afiliado mostrado en pantalla y compártelo con tus amigos. Anímalos a que realicen su primer cambio.</Text>,
        },
        {
          title: "2. Recibe KASH por cada referido",
          image: require("../../../assets/illustrations/superkash.png"),
          component: <Text>Cada amigo registrado con tu codigo recibirá una tasa preferencial en su primer cambio y tu ganarás 1 KASH.</Text>,
        },
        {
          title: "3. Acumula beneficios sin límites",
          image: require("../../../assets/illustrations/save-kash.png"),
          component: <Text>Acumula KASH y úsalos en tus cambios tanto en soles como en dólares. También podrás retirarlos a tu cuenta bancaria cuando quieras.</Text>,
        },
      ],
    });

  // HANDLERS
  const shareCode = async () => {
    await Share.share({ message: `Utiliza mi código de referido ${user.username}` });
  };

  return (
    <SafeArea>
      <AffiliatesScroll>
        <Spacer variant="top" size={3} />
        <Text variant="title">¡Recomieda y gana!</Text>
        <Text>Comparte el côdigo con tus amigos</Text>
        <Spacer variant="top" size={2} />
        <Carousel
          layout="default"
          ref={(ref) => (carousel.current = ref)}
          data={slider.items}
          renderItem={SlideItem}
          sliderWidth={350}
          slideStyle={{ height: Dimensions.get("window").height / 2, alignItems: "center", justifyContent: "center" }}
          itemWidth={350}
          contentContainerCustomStyle={{ display: "flex", alignItems: "center" }}
          loop
          autoplay
          autoplayDelay={2000}
          autoplayInterval={5000}
        />
        <Spacer variant="top" size={2} />
        <CodeWrapper>
          <Text variant="subtitle" style={{ textTransform: "uppercase" }}>
            {user.username}
          </Text>
        </CodeWrapper>
        <Spacer variant="top" />
        <ButtonsWrapper>
          <Button style={{ width: "75%" }} onPress={shareCode}>
            compartir código
          </Button>
          <Spacer variant="left" />
          <Button variant="secondary" onPress={() => navigation.navigate("EditCode", { username: user.username })} style={{ width: "20%" }}>
            <FontAwesome5 name="edit" size={25} color="#20A2A5" />
          </Button>
        </ButtonsWrapper>
        <Spacer variant="top" />
        <Text>
          Comparte tu código a tus amigos y <Text variant="bold">gana KASH</Text>.
        </Text>
      </AffiliatesScroll>
    </SafeArea>
  );
};
