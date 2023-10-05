import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useLazyGetBanksQuery, useLazyGetCurrenciesQuery } from '../services/account'
import { setBanks, setCurrencies } from '@/store/slices/appData'

export function useAccountsData(signedIn = false) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [getBanks] = useLazyGetBanksQuery()
  const [getCurrencies] = useLazyGetCurrenciesQuery()

  useEffect(() => {
    const getAppData = async () => {
      setLoading(true)

      try {
        const [banks, currencies] = await Promise.all([await getBanks().unwrap(), await getCurrencies().unwrap()])

        dispatch(setCurrencies(currencies))
        dispatch(setBanks(banks))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (signedIn) getAppData()
  }, [dispatch, getBanks, getCurrencies, signedIn])

  return { loading }
}
