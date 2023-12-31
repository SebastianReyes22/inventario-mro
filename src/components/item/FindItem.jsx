import axios from 'axios';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { FormSearch, ModalImage, SpinnerLoading } from '../ui';
import { TableFindItem } from './tables';

export const FindItem = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [product, setProduct] = useState('');
  const [inventory, setInventory] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const openModal = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('option', 'findProduct');
    formData.append('item_code', product);
    formData.append('descripcion', product);
    formData.append('descripcion_ingles', product);

    setIsLoading(true);

    await axios
      .post(URI, formData)
      .then(response => {
        if (response.data.find === false) {
          alert('Error, no se pudo encontrar el producto');
        } else {
          setInventory(response.data);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });

    setIsLoading(false);
  };

  return (
    <FormSearch
      handleSubmit={handleSubmit}
      product={product}
      setProduct={setProduct}
      isLoading={isLoading}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Row className='mt-4 scrollable-container'>
          <TableFindItem inventory={inventory} openModal={openModal} />
          <ModalImage show={showModal} onHide={closeModal} imageSrc={selectedImage} />
        </Row>
      )}
    </FormSearch>
  );
};
