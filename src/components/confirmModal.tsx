import { Box, Modal, Button } from '@mui/material'

interface Modal {
  openModal: boolean
  setOpenModal: (isOpen: boolean) => void
  confirmDelete: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export default function ConfirmModal({
  openModal,
  setOpenModal,
  confirmDelete,
}: Modal) {
  const handleClose = () => {
    setOpenModal(false)
  }
  const handleConfirmation = () => {
    confirmDelete()
    setOpenModal(false)
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div
          style={style}
          className='flex flex-col items-center justify-center bg-slate-300 w-1/2 h-28 md:w-4/5 rounded-sm'
        >
          <h2 id='modal-modal-description'>Do you want to delete this note?</h2>
          <div className='items-center justify-center mt-4'>
            <Button id='modal' onClick={handleConfirmation}>
              Yes
            </Button>
            <Button id='modal' onClick={handleClose}>
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
