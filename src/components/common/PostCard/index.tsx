import { post } from '../type'
import { useMemo, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BiUserCircle, BiLike } from 'react-icons/bi'
import { BsThreeDots, BsShare, BsSendFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { GiEarthAmerica } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { getLikesByUser, likeButton } from '../../../api/FirestoreAPI'

const PostCard = ({
  text,
  timeStamp,
  author,
  id,
  email,
  headline,
  userID,
}: post) => {
  const navigate = useNavigate()
  const [likesCount, setLikesCount] = useState<number>(0)
  const [liked, setLiked] = useState<boolean>(false)
  const handleLikeBtn = () => {
    likeButton(id, userID!, liked)
  }
  useMemo(() => {
    getLikesByUser(userID!, id, setLiked, setLikesCount)
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
        <p className="cursor-pointer hover:underline hover:text-blue-500 underline-offset-2 text-sm">
          1 yorum
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
          <li className="flex gap-3 items-center">
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
    </div>
  )
}
export default PostCard
