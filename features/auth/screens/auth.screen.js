import React, { useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

// Components
import { AuthWrapper } from "../components/auth.styles";
import { SlideItem } from "../../../components/UI/slide-item.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Button } from "../../../components/UI/button.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";

export const AuthScreen = ({ navigation }) => {
  const carousel = useRef();

  const [slider] = useState({
    index: 0,
    items: [
      {
        title: "Ahorra cambiando tus divisas",
        image: require("../../../assets/illustrations/platform/dollars-phone.png"),
        component: <Text>Por cada cambio que realices estarás ahorrando. Descubre todo lo haz ahorrado en tu tabla de actividades.</Text>,
      },
      {
        title: "Gana 1 KASH al recomendarnos",
        image: require("../../../assets/illustrations/money/coin-3d.png"),
        component: (
          <Text>
            Obtén <Text variant="bold">1 KASH</Text> cada vez que un amigo use tu código para su primer cambio. El también obtendrá una tasa preferencial.
          </Text>
        ),
      },
      {
        title: "Miles de usuarios cambian de forma fácil y segura",
        image: require("../../../assets/illustrations/platform/lock-3d.png"),
        component: <Text>En Instakash siempre pensamos en lo que necesitas ganando tu confianza y fidelidad. Por ello ofrecemos una plataforma 100% segura.</Text>,
      },
    ],
  });

  return (
    <SafeArea>
      <AuthWrapper>
        <Carousel
          layout="default"
          ref={(ref) => (carousel.current = ref)}
          data={slider.items}
          renderItem={SlideItem}
          sliderWidth={Dimensions.get("window").width < 385 ? 300 : 375}
          itemWidth={Dimensions.get("window").width < 385 ? 300 : 375}
          contentContainerCustomStyle={{ display: "flex", alignItems: "center" }}
          autoplay
          autoplayInterval={4000}
          autoplayDelay={3000}
        />
        <Button variant="secondary" onPress={() => navigation.navigate("Login")}>
          Acceder
        </Button>
        <Button variant="primary" onPress={() => navigation.navigate("Register")}>
          Registrarse
        </Button>
        <Spacer variant="top" size={6} />
      </AuthWrapper>
    </SafeArea>
  );
};
