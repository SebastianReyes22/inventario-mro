import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { ModalImage } from '../ui';

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
            <th>Nivel</th>
            <th>Cantidad</th>
            <th>Función</th>
            <th>Linea de aplicación</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {props.inventory.map(item => (
            <tr key={item.id_inventario}>
              <td>{item.item_code}</td>
              <td>{item.descripcion_ingles}</td>
              <td>{item.descripcion}</td>
              <td>{item.ubicacion}</td>
              <td>{item.nivel}</td>
              <td>{item.cantidad}</td>
              <td>{item.funcion}</td>
              <td>{item.aplicacion}</td>
              <td className='td-img'>
                <a href='#' onClick={() => openModal(item.imagen)}>
                  <img className='table-img' src={item.imagen} alt={item.item_code} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalImage show={showModal} onHide={closeModal} imageSrc={selectedImage} />
    </div>
  );
};
