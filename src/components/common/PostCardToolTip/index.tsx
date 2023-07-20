import { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { BsThreeDots, BsPencil, BsTrash, BsBookmark } from 'react-icons/bs'
import { deletePostDatabase } from '../../../api/FirestoreAPI'

const PostCardToolTip = ({ getEditData, text, postUserID, user, id }) => {
  const deletePost = () => {
    deletePostDatabase(id)
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <p className="flex items-center gap-2 font-semibold">
          <BsBookmark size={18} /> Kaydet
        </p>
      ),
      key: '0',
    },
    {
      label: (
        <p
          className={
            user.userID === postUserID
              ? 'flex items-center gap-2 font-semibold'
              : 'hidden'
          }
          onClick={() => getEditData(text)}
        >
          <BsPencil size={18} />
          Gönderiyi Düzenle
        </p>
      ),
      key: '1',
    },
    {
      label: (
        <button
          className={
            user?.userID === postUserID
              ? 'flex items-center gap-2 font-semibold'
              : 'hidden'
          }
          onClick={deletePost}
        >
          <BsTrash size={18} /> Gönderiyi Sil
        </button>
      ),
      key: '2',
    },
  ]
  return (
    <div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <BsThreeDots size={20} className="cursor-pointer" />
        </a>
      </Dropdown>
    </div>
  )
}
export default PostCardToolTip
