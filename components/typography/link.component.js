import styled from "styled-components/native";

const defaultStyles = (theme) => `
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text.title};
`;

export const Link = styled.TouchableOpacity`
  ${({ theme }) => defaultStyles(theme)}
`;
