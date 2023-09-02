import Text from '@/components/utils/Text'
import GoogleIcon from '../../../../assets/images/svgs/GoogleIcon'
import Button from '../../UI/Button'
import { useGoogleLogin } from './GoogleLogin.logic'

export default function GoogleButton() {
  const { handleGoogleLogin, isLoading } = useGoogleLogin()

  return (
    <Button variant="secondary" loading={isLoading} className="w-full" onPress={handleGoogleLogin} icon={() => <GoogleIcon width={20} />}>
      <Text variant="button" style={{ color: '#525252' }}>
        Ingresar con google
      </Text>
    </Button>
  )
}
