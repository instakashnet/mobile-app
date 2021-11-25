import styled from "styled-components/native";

const defaultStyles = (theme) => `
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text.body};
    line-height: ${theme.lineHeights.copy};
    flex-wrap: wrap;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
`;

const flag = (theme) => `
    font-size: ${theme.fontSizes.flag};
`;

const title = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-family: ${theme.fonts.title};
    color: ${theme.colors.text.title};
    margin-vertical: ${theme.space[1]}
`;

const subtitle = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-family: ${theme.fonts.subtitle};
    color: ${theme.colors.text.title};
    margin-vertical: ${theme.space[1]}
`;

const bold = (theme) => `
    font-family: ${theme.fonts.button};
    color: ${theme.colors.text.title};
`;

const button = (theme) => `
    font-family: ${theme.fonts.button};
`;

const underline = (theme) => `
    font-family: ${theme.fonts.button};
    color: ${theme.colors.text.title};
    text-decoration-line: underline;
`;

const error = (theme) => `
  font-family: ${theme.fonts.button};
  color: #fff;
`;

const variants = {
  title,
  button,
  subtitle,
  bold,
  body,
  caption,
  flag,
  underline,
  error,
};

export const Text = styled.Text.attrs({
  allowFontScaling: false,
  adjustsFontSizeToFit: true,
  numberOfLines: 4,
})`
  ${({ theme }) => defaultStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
