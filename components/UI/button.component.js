import styled from "styled-components/native";
import { Button as PaperButton } from "react-native-paper";

const defaultStyles = (theme) => `
  width: 100%;
  margin-top: ${theme.space[3]};
  margin-bottom: ${theme.space[2]};
  shadow-color: #000;
  shadow-opacity: 0.10;
  shadow-offset: 5px 10px;
  shadow-radius: 17px;
  elevation: 5;
`;

const defaultAttrs = (theme) => ({
  labelStyle: {
    color: theme.colors.text.body,
    fontSize: 14,
    fontFamily: theme.fonts.button,
    letterSpacing: 0,
  },
  contentStyle: {
    height: 45,
  },
});

const primary = (theme) => ({
  color: theme.colors.buttons.active,
});

const secondary = (theme) => ({
  color: theme.colors.buttons.secondary,
});

const variants = {
  primary,
  secondary,
};

export const Button = styled(PaperButton).attrs(({ theme, variant }) => ({
  ...defaultAttrs(theme),
  ...variants[variant](theme),
}))`
  ${({ theme }) => defaultStyles(theme)}
`;

Button.defaultProps = {
  variant: "primary",
  mode: "contained",
  uppercase: false,
};
