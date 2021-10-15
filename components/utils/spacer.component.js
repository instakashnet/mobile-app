import styled from "styled-components/native";

const defaultStyles = (theme) => `
    padding: ${theme.space[1]};
`;

const top = (theme, size = 0) => `
    margin-top: ${theme.space[size]};
`;

const bottom = (theme, size = 0) => `
    margin-bottom: ${theme.space[size]};
`;

const right = (theme, size = 0) => `
    margin-right: ${theme.space[size]};
`;

const left = (theme, size = 0) => `
    margin-left: ${theme.space[size]};
`;

const vertical = (theme, size = 0) => `
    margin-vertical: ${theme.space[size]};
`;

const horizontal = (theme, size = 0) => `
    margin-horizontal: ${theme.space[size]};
`;

const variants = {
  top,
  bottom,
  right,
  left,
  vertical,
  horizontal,
};

export const Spacer = styled.View`
  ${({ theme }) => defaultStyles(theme)}
  ${({ variant, theme, size }) => variants[variant](theme, size)}
`;

Spacer.defaultProps = {
  variant: "top",
  size: 1,
};
