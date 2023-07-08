import { useEffect, useState } from 'react'

import { useGetScheduleQuery } from '../services/exchange'
import { formatTimeTo12Hour } from '../helpers/formatters'

export function useSchedule() {
  const [schedule, setSchedule] = useState(null)
  const { data, isLoading } = useGetScheduleQuery()

  useEffect(() => {
    if (data) {
      const scheduleValues = {
        status: 'open',
        day: '',
        timeRange: '',
      }

      data.some(day => {
        const currentDate = new Date()
        const currentDay = currentDate.getDay()

        if (day.idDayOfWeek === currentDay) {
          scheduleValues.day = day.dayOfWeekName

          const currentTime = currentDate.getTime()
          const startTimeString = day.startTime?.split(':')
          const endTimeString = day.endTime?.split(':')
          const startTime = new Date()
          startTime.setHours(startTimeString[0], startTimeString[1], startTimeString[2])
          const endTime = new Date()
          endTime.setHours(endTimeString[0], endTimeString[1], endTimeString[2])

          scheduleValues.timeRange = formatTimeTo12Hour(startTime) + ' - ' + formatTimeTo12Hour(endTime)

          if (currentTime < startTime.getTime()) {
            scheduleValues.status = 'closed'
          } else if (currentTime > endTime.getTime()) {
            scheduleValues.status = 'closed'
          } else {
            scheduleValues.status = 'open'
          }

          return true
        }
      })

      setSchedule(scheduleValues)
    }
  }, [data])

  return { schedule, isLoading }
}
