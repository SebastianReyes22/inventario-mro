import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';

export const EditProduct = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [product, setProduct] = useState('');
  const [inventory, setInventory] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('option', 'findProduct');
    formData.append('item_code', product);
    formData.append('descripcion', product);
    formData.append('descripcion_ingles', product);

    await axios
      .post(URI, formData)
      .then(response => {
        if (response.data.find === false) {
          alert('Error, no se pudo encontrar el producto');
        } else {
          setInventory(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  // POST API to add product
  const handleAdd = async (e, item) => {
    let formData = new FormData();
    formData.append('option', 'addProduct');
    formData.append('id_inventario', item.id_inventario);
    formData.append('cantidad', itemQuantities[item.id_inventario]);

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
    console.log(itemQuantities[item.id_inventario]);
  };

  // POST API to delete product
  const handleDelete = async (e, item) => {
    let formData = new FormData();
    formData.append('option', 'deleteProduct');
    formData.append('id_inventario', item.id_inventario);
    formData.append('cantidad', itemQuantities[item.id_inventario]);

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
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='col-10'>
            <Form.Control
              type='text'
              placeholder='item code, nombre del producto o descripción'
              value={product}
              onChange={e => setProduct(e.target.value)}
            />
          </Col>
          <Col className='col-2'>
            <div className='d-grid gap-2'>
              <Button variant='primary' type='submit'>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Table striped bordered hover fixed>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Item Code</th>
                <th style={{ width: '25%' }}>Descripción (Español)</th>
                <th style={{ width: '25%' }}>Descripción (Ingles)</th>
                <th style={{ width: '10%' }}>Stock</th>
                <th style={{ width: '15%' }}>Cantidad a modificar</th>
                <th style={{ width: '7%' }}>Añadir</th>
                <th style={{ width: '7%' }}>Quitar</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id_inventario}>
                  <td>{item.item_code}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.descripcion_ingles}</td>
                  <td>{item.cantidad}</td>
                  <td>
                    <Form.Control
                      type='number'
                      value={itemQuantities[item.id_inventario] || 0}
                      min={0}
                      onChange={e => {
                        const newQuantity = parseInt(e.target.value);
                        setItemQuantities(prevQuantities => ({
                          ...prevQuantities,
                          [item.id_inventario]: isNaN(newQuantity) ? 0 : newQuantity,
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <div className='d-flex justify-content-center'>
                      <Button variant='primary' onClick={e => handleAdd(e, item)}>
                        +
                      </Button>
                    </div>
                  </td>
                  <td className='d-flex justify-content-center'>
                    <Button variant='danger' onClick={e => handleDelete(e, item)}>
                      -
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Form>
    </div>
  );
};
