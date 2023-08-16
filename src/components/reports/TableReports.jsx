import { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';

export const TableReports = props => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Description (English)</th>
            <th>Descripción (Español)</th>
            <th>Ubicación</th>
            <th>Imagen</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {props.inventory.map(item => (
            <tr key={item.id_inventario}>
              <td>{item.item_code}</td>
              <td>{item.descripcion_ingles}</td>
              <td>{item.descripcion}</td>
              <td>{item.ubicacion}</td>
              <td className='td-img'>
                <a href='#' onClick={() => openModal(item.imagen)}>
                  <img className='table-img' src={item.imagen} alt={item.item_code} />
                </a>
              </td>

              <td>{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <div className='modal-dialog'>
          <Modal.Body>
            <img src={selectedImage} alt='Modal' />
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};
