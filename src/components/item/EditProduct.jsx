import axios from 'axios';
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { Row } from 'react-bootstrap';
import { TableEditProduct } from './tables';
import { FormSearch, SpinnerLoading } from '../ui';

export const EditProduct = () => {
  const URI = import.meta.env.VITE_APP_API;
  const { user } = useUserAuth();

  const [product, setProduct] = useState('');
  const [inventory, setInventory] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [itemObservations, setItemObservations] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // Search product
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

  // Add product to inventory
  const handleAdd = async (e, item) => {
    if (itemObservations[item.id_inventario] === undefined)
      itemObservations[item.id_inventario] = 'Sin comentario agregado';

    let formData = new FormData();
    formData.append('option', 'addProduct');
    formData.append('id_inventario', item.id_inventario);
    formData.append('cantidad', itemQuantities[item.id_inventario]);
    formData.append('usuario', user.displayName);
    formData.append('item', item.item_code);
    formData.append('tipo_movimiento', 'alta');
    formData.append('comentario', itemObservations[item.id_inventario]);
    formData.append('fecha_movimiento', new Date().toISOString().slice(0, 10));

    await axios
      .post(URI, formData)
      .then(response => {
        if (response.data.status === false) {
          alert('Error, no se pudo actualizar el producto');
        } else {
          alert('Producto actualizado');
          setProduct('');
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  // Delete product from inventory
  const handleDelete = async (e, item) => {
    let formData = new FormData();
    formData.append('option', 'deleteProduct');
    formData.append('id_inventario', item.id_inventario);
    formData.append('cantidad', itemQuantities[item.id_inventario]);
    formData.append('usuario', user.displayName);
    formData.append('item', item.item_code);
    formData.append('tipo_movimiento', 'baja');
    formData.append('comentario', itemObservations[item.id_inventario]);
    formData.append('fecha_movimiento', new Date().toISOString().slice(0, 10));

    await axios
      .post(URI, formData)
      .then(response => {
        if (response.data.status === false) {
          alert('Error, no se pudo actualizar el producto');
        } else {
          alert('Producto actualizado');
          setProduct('');
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  return (
    <FormSearch
      handleSubmit={handleSubmit}
      product={product}
      setProduct={setProduct}
      isLoading={isLoading}>
      <Row className='mt-4 scrollable-container'>
        {isLoading ? (
          <SpinnerLoading />
        ) : (
          <TableEditProduct
            inventory={inventory}
            itemQuantities={itemQuantities}
            setItemQuantities={setItemQuantities}
            itemObservations={itemObservations}
            setItemObservations={setItemObservations}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
        )}
      </Row>
    </FormSearch>
  );
};
