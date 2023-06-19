import { useState, useEffect } from 'react'

export const useCountdown = (expTime) => {
  const [timerId, setTimerId] = useState(0),
    [countdown, setCountdown] = useState(Date.now() + expTime)

  const completeHandler = (onFinish) => {
    // setCountdown(Date.now() + expTime)
    // setTimerId((prev) => prev + 1)

    onFinish(() => {
      setCountdown(Date.now() + expTime)
      setTimerId((prev) => prev + 1)
    })
  }

  return { timerId, countdown, completeHandler }
}
