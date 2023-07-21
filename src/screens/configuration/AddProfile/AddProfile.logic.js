import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRucInfo } from '../../../hooks/useRucInfo'
import { useUpdate } from '../../../hooks/useUpdate'
import { addCompanyProfileSchema } from '../../../schemas/user'
import { useAddProfileMutation } from '../../../services/userData'

export function useAddProfile() {
  const debounceRef = useRef(null)
  const [ruc, setRuc] = useState('')
  const { goBack } = useNavigation()
  const { rucInfo, validateRuc, isLoading } = useRucInfo()
  const [addProfile, { isLoading: isProcessing }] = useAddProfileMutation()

  const { setValue, control, handleSubmit, resetField, formState } = useForm({
    defaultValues: {
      type: 'juridica',
      ruc: '',
      razon_social: '',
      address: '',
      accept: false,
    },
    resolver: yupResolver(addCompanyProfileSchema),
  })

  useUpdate(() => {
    if (rucInfo) {
      setValue('razon_social', rucInfo?.nombre_o_razon_social, { shouldValidate: true })
      setValue('address', rucInfo?.direccion, { shouldValidate: true })
    } else {
      resetField('razon_social')
      resetField('address')
    }
  }, [rucInfo])

  const handleRucChange = value => {
    setValue('ruc', value, { shouldValidate: true })
    setRuc(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!value || value.length < 11) return
    debounceRef.current = setTimeout(() => validateRuc(value), 1000)
  }

  const onSubmit = async values => {
    try {
      await addProfile(values).unwrap()
      return goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    ruc,
    rucInfo,
    handleRucChange,
    control,
    formState,
    isLoading,
    isProcessing,
    onSubmit: handleSubmit(onSubmit),
  }
}
