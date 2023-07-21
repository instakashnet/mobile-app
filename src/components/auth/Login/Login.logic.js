import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/core'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getData, storeData } from '../../../lib/AsyncStorage'
import { loginValidationSchema } from '../../../schemas/auth'
import { useLazyGetSessionQuery, useLoginMutation } from '../../../services/auth'

export function useLogin() {
  const { navigate } = useNavigation()
  const [remember, setRemember] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const [getSession] = useLazyGetSessionQuery()

  const { control, setValue, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  })

  useEffect(() => {
    const getRememberUser = async () => {
      const data = await getData('userEmail')
      if (data?.email) {
        setRemember(true)
        setValue('email', data.email)
      }
    }
    getRememberUser()
  }, [setValue])

  const toggleRemember = () => setRemember(prev => !prev)

  const onSubmit = useCallback(
    async values => {
      try {
        const response = await login(values).unwrap()
        if (remember) await storeData('userEmail', { email: values.email })

        if (!response.verified) return navigate('VerifyCode', { verificationType: 'OTP' })
        if (!response.completed) return navigate('Complete')
        await getSession().unwrap()
      } catch (error) {
        console.error(error)
      }
    },
    [remember, login, getSession, navigate],
  )

  return {
    control,
    handleSubmit,
    formState,
    toggleRemember,
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    rememberEmail: remember ? 'checked' : 'unchecked',
  }
}
