import React, { useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";

// Components
import { AuthWrapper } from "../components/auth.styles";
import { SlideItem } from "../components/slide.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Button } from "../../../components/UI/button.component";
import { Text } from "../../../components/typography/text.component";

export const AuthScreen = ({ navigation }) => {
  const carousel = useRef();

  const [slider] = useState({
    index: 0,
    items: [
      {
        title: "Bienvenido a Instakash",
        image: require("../../../assets/illustrations/coin-3d.png"),
        text: (
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, <Text variant="bold">a cursus vel magna hendrerit.</Text>
          </Text>
        ),
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
          sliderWidth={300}
          itemWidth={300}
          containerCustomStyle={{ flexGrow: 0, padding: 0 }}
        />
        <Button variant="secondary" onPress={() => navigation.navigate("Login")}>
          Acceder
        </Button>
        <Button variant="primary" onPress={() => navigation.navigate("Register")}>
          Registrarse
        </Button>
      </AuthWrapper>
    </SafeArea>
  );
};
