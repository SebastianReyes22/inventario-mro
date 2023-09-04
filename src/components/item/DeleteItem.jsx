import axios from 'axios';
import { useState } from 'react';
import { FormSearch, ModalImage, SpinnerLoading } from '../ui';
import { TableDeleteItem } from './tables';

export const DeleteItem = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [product, setProduct] = useState('');
  const [inventory, setInventory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleDelete = async (e, item) => {
    e.preventDefault();

    if (window.confirm('¿Realmente quieres eliminar este producto?')) {
      let formData = new FormData();
      formData.append('option', 'deleteProductDB');
      formData.append('id_inventario', item.id_inventario);

      setIsLoading(true);

      await axios
        .post(URI, formData)
        .then(response => {
          if (response.data.deleteProductDB === false) {
            alert('Error, no se pudo eliminar el producto');
          } else {
            alert('Producto eliminado correctamente');
            setInventory([]);
            setProduct('');
          }
        })
        .catch(error => {
          console.log(error, 'error');
        });

      setIsLoading(false);
    }
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
          <TableDeleteItem
            inventory={inventory}
            handleDelete={handleDelete}
            openModal={openModal}
          />
          <ModalImage show={showModal} onHide={closeModal} imageSrc={selectedImage} />
        </div>
      )}
    </FormSearch>
  );
};
