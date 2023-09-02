import { Text as PaperText } from 'react-native-paper'

function Text({ children, ...rest }) {
  return (
    <PaperText allowFontScaling={false} adjustsFontSizeToFit {...rest}>
      {children}
    </PaperText>
  )
}

export default Text
