import { Button, Modal, Progress } from 'antd'
import { FileType } from '../../../api/type'
import { useState } from 'react'
import { uploadImage } from '../../../api/Storage'
import { User } from '../type'

type UploadImageType = {
  setImageUploadModal: React.Dispatch<React.SetStateAction<boolean>>
  imageUploadModal: boolean
  currentUser: User
}

const ImageUploadModalComponents = ({
  setImageUploadModal,
  imageUploadModal,
  currentUser,
}: UploadImageType) => {
  const [currentImage, setCurrentImage] = useState<FileType>({} as FileType)
  const [progress, setProgress] = useState<number>(0)
  const getImage = (event: any) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImageAPI = () => {
    uploadImage(
      currentImage as any,
      currentUser?.id as string,
      setImageUploadModal,
      setProgress
    )
  }
  return (
    <Modal
      title="Profil Resmi Ekle"
      centered
      open={imageUploadModal}
      onOk={() => setImageUploadModal(false)}
      onCancel={() => setImageUploadModal(false)}
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
        <img src={currentUser?.imageLink!} className="rounded-full" />
        <input
          type={'file'}
          onChange={getImage!}
          className="flex justify-center items-center mt-4"
        />

        {progress > 0 && (
          <Progress type="circle" percent={progress} size={80} />
        )}
      </div>
    </Modal>
  )
}
export default ImageUploadModalComponents
