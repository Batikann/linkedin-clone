import { Button, Modal, Progress } from 'antd'
import { File } from '../../../api/type'
import { useState } from 'react'
import { uploadBgImage } from '../../../api/Storage'
import { User } from '../type'

type UploadImageType = {
  setBgImageModal: React.Dispatch<React.SetStateAction<boolean>>
  bgImageModal: boolean
  currentUser: User
  currentImage: File
}

const BgImageUploadModal = ({
  setBgImageModal,
  bgImageModal,
  currentUser,
}: UploadImageType) => {
  const [currentImage, setCurrentImage] = useState<File | null>({})
  const [progress, setProgress] = useState<number>(0)
  const getImage = (event: any) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImageAPI = () => {
    uploadBgImage(currentImage, currentUser?.id, setBgImageModal, setProgress)
  }
  return (
    <Modal
      title="Arka Plan Ekle"
      style={{ top: 20 }}
      open={bgImageModal}
      onOk={() => setBgImageModal(false)}
      onCancel={() => setBgImageModal(false)}
      footer={
        <Button
          disabled={currentImage?.name ? false : true}
          key="submit"
          type="primary"
          className="bg-light-blue hover:bg-dark-blue"
          onClick={uploadImageAPI!}
        >
          Ekle
        </Button>
      }
    >
      <div className="flex items-center justify-center flex-col gap-6">
        <img src={currentUser?.bgImageLink!} className="w-full" />
        <input
          type={'file'}
          onChange={getImage!}
          className="flex justify-center items-center mt-4 "
        />

        {progress > 0 && (
          <Progress type="circle" percent={progress} size={80} />
        )}
      </div>
    </Modal>
  )
}
export default BgImageUploadModal
