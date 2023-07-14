import moment from 'moment'

export const getRelativeTime = () => {
  const currentHour = moment().format('LLL')
  return currentHour
}
