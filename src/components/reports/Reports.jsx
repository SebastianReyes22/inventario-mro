import axios from 'axios';
import { useEffect, useState } from 'react';
import { ButtonDownload, TableReports } from './';
import { Col, Row } from 'react-bootstrap';

export const Reports = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [inventory, setInventory] = useState([]);

  const getInventory = async () => {
    let formData = new FormData();
    formData.append('option', 'inventario');

    await axios.post(URI, formData).then(response => {
      setInventory(response.data);
    });
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Row className='mb-4'>
        <Col className='col-2'>
          <ButtonDownload inventory={inventory} />
        </Col>
      </Row>
      <Row>
        <TableReports inventory={inventory} />
      </Row>
    </div>
  );
};
