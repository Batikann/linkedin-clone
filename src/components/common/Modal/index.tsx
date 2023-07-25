import { Modal, Button, Progress } from 'antd'
import { BsImage } from 'react-icons/bs'
import { uploadPostImage } from '../../../api/Storage'
import ReactQuill from 'react-quill'
import { useState } from 'react'
const ModalComponent = ({
  modalOpen,
  setModalOpen,
  text,
  setText,
  addPost,
  isEdit,
  updatePost,
  setPostImage,
  postImage,
}: any) => {
  const [progress, setProgress] = useState<number>(0)

  return (
    <Modal
      title="Basic Modal"
      open={modalOpen}
      onOk={() => {
        setText('')
        setModalOpen(false)
      }}
      onCancel={() => {
        setText('')
        setModalOpen(false)
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={isEdit ? updatePost : addPost}
          className={
            text
              ? 'bg-blue-600 text-white rounded-full hover:bg-blue-500'
              : 'bg-slate-200  font-medium rounded-full border-none'
          }
          disabled={text ? false : true}
        >
          {isEdit ? 'Güncelle' : 'Gönderi'}
        </Button>,
      ]}
    >
      <div className="h-[350px]">
        {progress > 0 && (
          <div className="flex justify-center w-full items-center">
            <Progress type="circle" percent={progress} size={80} />
          </div>
        )}
        {postImage && (
          <img
            src={postImage}
            alt=""
            className="mb-3 w-full object-cover h-80"
          />
        )}
        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          placeholder="Ne hakkında konuşmak istiyorsunuz?"
          className="w-full outline-none h-[300px]"
        />
      </div>
      <div className="cursor-pointer hover:bg-slate-300 p-2 inline-block rounded-full ">
        <label htmlFor="pic-upload">
          <BsImage size={22} className="text-light-blue" />
        </label>
        <input
          id="pic-upload"
          type={'file'}
          hidden
          onChange={(e) =>
            uploadPostImage(e.target.files[0], setPostImage, setProgress)
          }
        />
      </div>
    </Modal>
  )
}

export default ModalComponent
