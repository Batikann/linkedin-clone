import { post } from '../type'
import { useMemo, useState } from 'react'
import { AiFillLike, AiFillPicture } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { BsThreeDots, BsShare, BsSendFill, BsEmojiSmile } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { GiEarthAmerica } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import {
  getComments,
  getLikesByUser,
  likeButton,
  postComment,
} from '../../../api/FirestoreAPI'

const PostCard = ({
  text,
  timeStamp,
  author,
  id,
  email,
  headline,
  userID,
  user,
}: post) => {
  const navigate = useNavigate()
  const [likesCount, setLikesCount] = useState<number>(0)
  const [liked, setLiked] = useState<boolean>(false)
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState([])
  const handleLikeBtn = () => {
    likeButton(id, userID!, liked)
  }
  console.log(user)

  const getComment = (e) => {
    e.preventDefault()
    postComment(
      id,
      comment,
      timeStamp,
      user.headline,
      user.firstName,
      user.email
    )
    setComment('')
  }

  useMemo(() => {
    getLikesByUser(userID!, id, setLiked, setLikesCount)
    getComments(id, setComments)
  }, [id, userID])

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg md:w-[556px] w-full flex flex-col gap-4">
      <div className="flex justify-between ">
        <div className="flex gap-4 items-center">
          <BiUserCircle size={30} />
          <div>
            <p
              className="text-sm font-semibold text-black cursor-pointer hover:underline underline-offset-2 hover:text-blue-600"
              onClick={() =>
                navigate('/profile', { state: { id: id, email: email } })
              }
            >
              {author}
            </p>
            <p className="text-xs text-gray-500">{headline}</p>
            <div className="flex gap-1 items-center">
              <p className="text-xs text-gray-500">{timeStamp.timeAgo}</p>
              <span>&#183;</span>
              <GiEarthAmerica className="text-gray-600" />
            </div>
          </div>
        </div>
        <BsThreeDots size={20} />
      </div>
      <div>
        <span className="text-sm">{text}</span>
      </div>
      <div className="flex justify-between">
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
      <div className="border-t border-gray-300">
        <ul className="flex md:justify-between justify-around pt-4">
          <li
            className="flex gap-3 items-center cursor-pointer hover:bg-slate-200 p-3 rounded-md"
            onClick={handleLikeBtn}
          >
            <AiFillLike size={20} className={liked ? 'text-blue-500' : ''} />
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
            <BiUserCircle size={28} />
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
                    <BiUserCircle size={30} />
                    <div className="bg-comment-bg md:w-[462px] w-[334px] p-3 rounded-lg">
                      <div className="mb-3">
                        <div className="flex gap-2">
                          <p className="text-base font-semibold">
                            {comment.author}
                          </p>
                          {email == comment.email ? (
                            <p className="text-xs text-white bg-slate-500 font-semibold py-1 px-2 rounded-md">
                              Yazar
                            </p>
                          ) : (
                            ''
                          )}
                        </div>
                        <p className="text-xs">{comment.headline}</p>
                      </div>
                      <div className="break-words ">
                        <p className="text-sm  ">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            : ''}
        </div>
      )}
    </div>
  )
}
export default PostCard
