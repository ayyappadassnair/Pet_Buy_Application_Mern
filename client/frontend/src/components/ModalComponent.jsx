import React from 'react'
import { Button,Modal } from 'react-bootstrap'
const ModalComponent = ({showConfirmation,cancelDeleteUser,confirmDeleteUser,usecase}) => {
  return (
    <>
     <Modal show={showConfirmation} onHide={cancelDeleteUser}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {usecase}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteUser}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComponent