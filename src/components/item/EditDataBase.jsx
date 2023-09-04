import axios from 'axios';
import { useState } from 'react';
import { FormSearch, ModalImage, SpinnerLoading } from '../ui';
import { TableEditDataBase } from './tables';

export const EditDataBase = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState('');
  const [inventory, setInventory] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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
    formData.append('option', 'findSingleProduct');
    formData.append('item_code', product);

    setIsLoading(true);

    await axios
      .post(URI, formData)
      .then(response => {
        if (response.data.findSingle === false) {
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
        <div>
          <TableEditDataBase inventory={inventory} openModal={openModal} URI={URI} />
          <ModalImage show={showModal} onHide={closeModal} imageSrc={selectedImage} />
        </div>
      )}
    </FormSearch>
  );
};
