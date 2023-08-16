import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';

export const FindItem = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [product, setProduct] = useState('');
  const [inventory, setInventory] = useState([]);

  const [wait, setWait] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('option', 'findProduct');
    formData.append('item_code', product);
    formData.append('descripcion', product);
    formData.append('descripcion_ingles', product);

    setWait(true);

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

    setWait(false);
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
        {wait ? (
          <div className='spinner-container'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <Row className='mt-4 scrollable-container'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Descripción (Español)</th>
                  <th>Descripción (Ingles)</th>
                  <th>Ubicación</th>
                  <th>Cantidad</th>
                  <th>Imagen</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id_inventario}>
                    <td>{item.item_code}</td>
                    <td>{item.descripcion_ingles}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.ubicacion}</td>
                    <td>{item.cantidad}</td>
                    <td className='td-img'>
                      <img className='table-img' src={item.imagen} alt={item.nombre} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        )}
      </Form>
    </div>
  );
};
