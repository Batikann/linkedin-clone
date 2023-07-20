import { Modal, Button } from 'antd'

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  text,
  setText,
  addPost,
  isEdit,
  updatePost,
}: any) => {
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
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ne hakkında konuşmak istiyorsunuz?"
        className="w-full outline-none h-full"
      />
    </Modal>
  )
}

export default ModalComponent
