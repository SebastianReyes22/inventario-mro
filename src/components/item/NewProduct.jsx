import { useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { InputLevel, InputLocation } from './';
import { convertToBase64 } from '../ui';

export const NewProduct = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [itemCode, setItemCode] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEnglish, setDescriptionEnglish] = useState('');
  const [location, setLocation] = useState([]);
  const [locationSelected, setLocationSelected] = useState('');
  const [level, setLevel] = useState([]);
  const [levelSelected, setLevelSelected] = useState('');
  const [quantity, setQuantity] = useState('');
  const [functionProduct, setFunctionProduct] = useState('');
  const [application, setApplication] = useState('');

  const handleSubmit = async () => {
    if (
      itemCode === '' ||
      description === '' ||
      locationSelected === '' ||
      levelSelected === '' ||
      quantity === '' ||
      descriptionEnglish === '' ||
      functionProduct === '' ||
      application === '' ||
      document.querySelector('input[type="file"]').files.length === 0
    ) {
      alert('Faltan campos por llenar');
      return;
    }

    const base64 = await convertToBase64(
      document.querySelector('input[type="file"]').files,
    );

    let formData = new FormData();
    formData.append('option', 'insert');
    formData.append('item_code', itemCode);
    formData.append('descripcion', description);
    formData.append('descripcion_ingles', descriptionEnglish);
    formData.append('ubicacion', locationSelected);
    formData.append('nivel', levelSelected);
    formData.append('cantidad', quantity);
    formData.append('funcion', functionProduct);
    formData.append('aplicacion', application);
    formData.append('imagen', base64);

    await axios
      .post(URI, formData)
      .then(response => {
        console.log(response.data);
        if (response.data.insert === true) {
          alert('Producto agregado correctamente');
          window.location.reload();
        } else {
          alert(response.data.insert);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form>
        <Row className='mt-2 mb-4'>
          <Col>
            <Form.Label>Item Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='QX000001'
              value={itemCode}
              onChange={e => setItemCode(e.target.value)}
            />
          </Col>
          <Col>
            <InputLocation
              URI={URI}
              location={location}
              setLocation={setLocation}
              locationSelected={locationSelected}
              setLocationSelected={setLocationSelected}
            />
          </Col>
          <Col>
            <InputLevel
              URI={URI}
              level={level}
              setLevel={setLevel}
              levelSelected={levelSelected}
              setLevelSelected={setLevelSelected}
            />
          </Col>
        </Row>
        <Row className='mt-4 mb-2'>
          <Col>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type='number'
              placeholder='24'
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Descripción (Ingles)</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rotor(High)...'
              value={descriptionEnglish}
              onChange={e => setDescriptionEnglish(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Descripción (Español)</Form.Label>
            <Form.Control
              type='text'
              placeholder='Rotor(High)...'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <Form.Label>Función</Form.Label>
            <Form.Control
              type='text'
              placeholder='Este dispositivo es utilizado para...'
              value={functionProduct}
              onChange={e => setFunctionProduct(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Linea de aplicación</Form.Label>
            <Form.Control
              type='text'
              placeholder='Slitter, Rewinder, etc...'
              value={application}
              onChange={e => setApplication(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type='file'
              size='mg'
              accept='.jpg, .png, .jpeg'
              onChange={e => convertToBase64(e.target.files)}
            />
          </Col>
        </Row>
        <Row>
          <Col className='col-10' />
          <Col className='col-2'>
            <div className='d-grid gap-2 mt-4'>
              <Button variant='primary' onClick={handleSubmit}>
                <FontAwesomeIcon icon={faSave} /> Guardar
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
