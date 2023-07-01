import { format, formatDistanceToNow } from 'date-fns'

export const getTimeHelper = (formatType: string) => {
  const currentTime = new Date()
  const formattedTime = format(currentTime, formatType)
  const timeAgo = formatDistanceToNow(currentTime, { addSuffix: true })
  return { timeAgo, formattedTime }
}
