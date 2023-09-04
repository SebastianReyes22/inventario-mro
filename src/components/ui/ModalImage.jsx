import { useState } from 'react';
import { Modal } from 'react-bootstrap';

export const ModalImage = props => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <div className='modal-dialog'>
        <Modal.Body>
          <img src={props.imageSrc} alt='Modal' />
        </Modal.Body>
      </div>
    </Modal>
  );
};
