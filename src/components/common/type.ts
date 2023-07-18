type time = {
  formattedTime: string
  timeAgo: string
}

export type post = {
  id: string
  text: string
  timeStamp: time
  email: string
  author: string | null
  userID?: string
  postID?: string
  headline?: string
}

export type User = {
  id?: string
  userID: string
  fullName?: string
  email?: string
  firstName?: string
  lastName?: string
  country?: string
  city?: string
  education?: string
  headline?: string
  additionalName?: string
  imageLink?: string | null
  bgImageLink?: string | null
}
