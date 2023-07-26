type time = {
  formattedTime: string
  timeAgo: string
}

export type Post = {
  id: string
  text: string
  timeStamp: string
  email: string
  author: string
  userID?: string
  postID?: string
  headline?: string
  postImage?: string
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
  imageLink?: string
  bgImageLink?: string
  getCurrentUser?: void
}

export type Comment = {
  userID: string
  author: string
  comment: string
  email: string
  headline: string | null
  postID: string
  timeStamp: string
  userImageLink: string
}
