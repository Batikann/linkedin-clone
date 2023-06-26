import { post } from '../type'
import { AiFillLike } from 'react-icons/ai'
import { BiUserCircle, BiLike } from 'react-icons/bi'
import { BsThreeDots, BsShare, BsSendFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'

const PostCard = ({ status }: post) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg md:w-[556px] w-full flex flex-col gap-4">
      <div className="flex justify-between ">
        <div className="flex gap-4 items-center">
          <BiUserCircle size={30} />
          <div>
            <p className="text-sm font-semibold text-black cursor-pointer hover:underline underline-offset-2 hover:text-blue-600">
              Taner Saydam
            </p>
            <p className="text-xs text-gray-500">
              Full Stack Software Trainer (Full Stack Yazılım Eğitmeni)
            </p>
            <p className="text-xs text-gray-500">1 hafta</p>
          </div>
        </div>
        <BsThreeDots size={20} />
      </div>
      <div>
        <span className="text-sm">{status}</span>
      </div>
      <div className="flex justify-between">
        <p className="flex items-center gap-1">
          <AiFillLike className="text-blue-500" size={15} />
          <span className="text-xs">136</span>
        </p>
        <p className="cursor-pointer hover:underline hover:text-blue-500 underline-offset-2 text-sm">
          1 yorum
        </p>
      </div>
      <div className="border-t border-gray-300">
        <ul className="flex md:justify-between justify-around pt-4">
          <li className="flex gap-3 items-center">
            <BiLike size={20} />
            <p className="text-sm font-medium text-gray-500 hidden md:block">
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
