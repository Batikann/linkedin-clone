import { Comment, Post, User } from '../type'
import { useMemo, useState, useEffect } from 'react'
import { AiFillLike, AiFillPicture } from 'react-icons/ai'
import { BsShare, BsSendFill, BsEmojiSmile } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { GiEarthAmerica } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import {
  getComments,
  getLikesByUser,
  likeButton,
  postComment,
  getAllUsers,
  getConnections,
} from '../../../api/FirestoreAPI'
import { getRelativeTime } from '../../../utils/dateUtils'
import PostCardToolTip from '../PostCardToolTip'

type PostCardType = {
  post: Post
  userID: string
  user: User
  setText: React.Dispatch<React.SetStateAction<string>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setPostID: React.Dispatch<React.SetStateAction<string>>
  setPostImage: React.Dispatch<React.SetStateAction<string>>
}

const PostCard = ({
  post,
  userID,
  user,
  setText,
  setModal,
  setIsEdit,
  setPostID,
  setPostImage,
}: PostCardType) => {
  const navigate = useNavigate()
  const [likesCount, setLikesCount] = useState<number>(0)
  const [liked, setLiked] = useState<boolean>(false)
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const handleLikeBtn = () => {
    likeButton(post.id, userID!, liked)
  }
  const timeStamp2 = getRelativeTime()

  useEffect(() => {
    setComments(
      comments.sort((a, b) => {
        const dateA: number = new Date(a.timeStamp).getTime()
        const dateB: number = new Date(b.timeStamp).getTime()
        return dateB - dateA
      })
    )
  }, [setComments, comments])
  useEffect(() => {
    getConnections(user?.userID, post.userID!, setIsConnected)
  }, [user.userID, post.userID])

  const getComment = (e: any) => {
    e.preventDefault()
    postComment(
      post.id,
      comment,
      timeStamp2,
      user.headline ? user.headline : '',
      user.firstName + ' ' + user.lastName,
      user.email!,
      user.imageLink
    )
    setComment('')
  }

  useMemo(() => {
    getLikesByUser(userID!, post.id, setLiked, setLikesCount)
    getComments(post.id, setComments)
    getAllUsers(setAllUsers)
  }, [post.id, userID])

  const getEditData = (text: string, postImage: string) => {
    setModal(true)
    setText(text)
    setPostImage(postImage)
    setIsEdit(true)
    setPostID(post.id)
  }

  return (
    <>
      {
        <div
          className={
            isConnected || user?.userID == post.userID
              ? 'bg-white  border border-gray-300 rounded-lg md:w-[556px] w-full flex flex-col gap-4 my-3'
              : 'hidden'
          }
        >
          <div className="flex justify-between p-4 ">
            <div className="flex gap-4 items-center ">
              <img
                src={
                  allUsers
                    .filter((user) => user?.userID == post.userID)
                    .map((item) => item.imageLink) as never
                }
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p
                  className="text-sm font-semibold text-black cursor-pointer hover:underline underline-offset-2 hover:text-blue-600"
                  onClick={() =>
                    navigate('/profile', {
                      state: { id: userID, email: post.email },
                    })
                  }
                >
                  {post.author}
                </p>
                <p className="text-xs text-gray-500">{post.headline}</p>
                <div className="flex gap-1 items-center">
                  <p className="text-xs text-gray-500">{post.timeStamp}</p>
                  <span>&#183;</span>
                  <GiEarthAmerica className="text-gray-600" />
                </div>
              </div>
            </div>
            <PostCardToolTip
              getEditData={getEditData}
              text={post.text}
              user={user}
              postUserID={post.userID}
              id={post.id}
              postImage={post.postImage}
            />
          </div>
          <div>
            {post.postImage && (
              <div className="mb-4">
                <img
                  src={post.postImage}
                  alt=""
                  className="w-full object-cover h-[300px]"
                />
              </div>
            )}
            <div className="px-4">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: post.text }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between px-4">
            {likesCount > 0 ? (
              <p className="flex items-center gap-1">
                <AiFillLike className="text-blue-500" size={15} />
                <span className="text-xs">{likesCount}</span>
              </p>
            ) : (
              ''
            )}
            <p
              className="cursor-pointer hover:underline hover:text-blue-500 underline-offset-2 text-sm"
              onClick={() => setShowComments(!showComments)}
            >
              {comments.length} yorum
            </p>
          </div>
          <div className="border-t border-gray-300 px-4 py-2">
            <ul className="flex md:justify-between justify-around pt-4">
              <li
                className="flex gap-3 items-center cursor-pointer hover:bg-slate-200 p-3 rounded-md"
                onClick={handleLikeBtn}
              >
                <AiFillLike
                  size={20}
                  className={liked ? 'text-blue-500' : ''}
                />
                <p
                  className={
                    liked
                      ? 'text-sm font-medium text-blue-500 hidden md:block'
                      : 'text-sm font-medium text-gray-500 hidden md:block'
                  }
                >
                  Beğen
                </p>
              </li>
              <li
                className=" flex gap-3 items-center cursor-pointer hover:bg-slate-200 p-3 rounded-md"
                onClick={() => setShowCommentBox(!showCommentBox)}
              >
                <FaRegCommentDots size={20} />
                <p className="text-sm font-medium text-gray-500 hidden md:block">
                  Yorum Yap
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <BsShare size={20} />
                <p className="text-sm font-medium text-gray-500 hidden md:block">
                  Paylaş
                </p>
              </li>
              <li className="flex gap-3 items-center cursor-pointer">
                <BsSendFill size={20} />
                <p className="text-sm font-medium text-gray-500 hidden md:block">
                  Gönder
                </p>
              </li>
            </ul>
          </div>
          {showCommentBox && (
            <div className="flex items-center  w-full gap-2 mt-2">
              <div>
                <img
                  src={
                    user.imageLink
                      ? user.imageLink
                      : 'https://i.seadn.io/gae/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A?auto=format&dpr=1&w=1000'
                  }
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="w-full relative">
                <form onSubmit={getComment}>
                  <input
                    type="text"
                    placeholder="Yorum ekle..."
                    className="w-full h-10 border border-gray-300 px-4 rounded-full focus:border-2 focus:border-gray-500 outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
                <div className="flex gap-5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2">
                  <BsEmojiSmile size={20} />
                  <AiFillPicture size={20} />
                </div>
              </div>
            </div>
          )}
          {showComments && (
            <div className="w-full">
              {comments.length > 0
                ? comments.map((comment, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4  p-2 md:w-[522px] w-[334px]"
                      >
                        <img
                          src={
                            comment.userImageLink
                              ? comment.userImageLink
                              : 'https://i.seadn.io/gae/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A?auto=format&dpr=1&w=1000'
                          }
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="bg-comment-bg md:w-[462px] w-[334px] p-3 rounded-lg flex justify-between">
                          <div>
                            <div className="mb-3">
                              <div className="flex gap-2">
                                <p className="text-base font-semibold">
                                  {comment.author}
                                </p>
                                {post.email == comment.email ? (
                                  <p className="text-xs text-white bg-slate-500 font-semibold py-1 px-2 rounded-md">
                                    Yazar
                                  </p>
                                ) : (
                                  ''
                                )}
                              </div>
                              <p className="text-xs">
                                {comment.headline ? comment.headline : ''}
                              </p>
                            </div>
                            <div className="break-words ">
                              <p className="text-sm  ">{comment.comment}</p>
                            </div>
                          </div>
                          <div className="text-xs font-semibold">
                            {comment.timeStamp}
                          </div>
                        </div>
                      </div>
                    )
                  })
                : ''}
            </div>
          )}
        </div>
      }
    </>
  )
}
export default PostCard
