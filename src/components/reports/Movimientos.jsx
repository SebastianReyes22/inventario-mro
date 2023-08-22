import { useState } from 'react';
import axios from 'axios';
import { ButtonDownloadMovimientos } from './ButtonDownloadMovimientos';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Movimientos = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [movimientos, setMovimientos] = useState([]);
  const [user, setUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (startDate === '' || endDate === '') {
      alert('Por favor selecciona un rango de fechas');
      return;
    }

    let formData = new FormData();
    formData.append('option', 'movimientos');
    formData.append('fechaInicial', startDate);
    formData.append('fechaFinal', endDate);
    formData.append('usuario', user);

    setIsLoading(true);

    await axios
      .post(URI, formData)
      .then(res => {
        if (res.data.movimiento === false) {
          alert('No hay movimientos en el rango de fechas seleccionado');
        } else {
          setMovimientos(res.data);
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));

    setIsLoading(false);
  };

  return (
    <div>
      <Row className='mb-4'>
        <Col className='col-3'>
          <Form.Label>Fecha de inicio</Form.Label>
          <Form.Control
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </Col>
        <Col className='col-3'>
          <Form.Label>Fecha final</Form.Label>
          <Form.Control
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            min={startDate}
          />
        </Col>
        <Col className='col-4'>
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type='text'
            placeholder='John Doe'
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </Col>
        <Col className='col-1'>
          <div className='d-grid gap-2 mt-4'>
            <Button variant='primary' onClick={handleSubmit} disabled={isLoading}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
        </Col>
        <Col className='col-1'>
          <ButtonDownloadMovimientos movimientos={movimientos} isLoading={isLoading} />
        </Col>
      </Row>
      <Row className='scrollable-container'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Item</th>
              <th>Movimiento</th>
              <th>Cantidad</th>
              <th>Comentario</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map(movimiento => (
              <tr key={movimiento.id_movimiento}>
                <td>{movimiento.usuario}</td>
                <td>{movimiento.item}</td>
                {movimiento.tipo_movimiento === 'alta' ? (
                  <td className='text-success'>{movimiento.tipo_movimiento}</td>
                ) : (
                  <td className='text-danger'>{movimiento.tipo_movimiento}</td>
                )}
                <td>{movimiento.cantidad}</td>
                <td>{movimiento.comentario}</td>
                <td>{movimiento.fecha_movimiento}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};
