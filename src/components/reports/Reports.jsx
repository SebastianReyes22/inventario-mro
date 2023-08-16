import axios from 'axios';
import { useEffect, useState } from 'react';
import { ButtonDownload, TableReports } from './';
import { Col, Row, Spinner } from 'react-bootstrap';

export const Reports = () => {
  const URI = import.meta.env.VITE_APP_API;

  const [inventory, setInventory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getInventory = async () => {
    let formData = new FormData();
    formData.append('option', 'inventario');

    setIsLoading(true);

    await axios
      .post(URI, formData)
      .then(response => {
        if (response.data.inventory === false) {
          setInventory([]);
          console.log('Sin items');
        } else {
          setInventory(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Row className='mb-4'>
        <Col className='col-2'>
          <ButtonDownload inventory={inventory} isLoading={isLoading} />
        </Col>
      </Row>
      <Row className='scrollable-container'>
        {isLoading ? (
          <div className='spinner-container'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : (
          <TableReports inventory={inventory} />
        )}
      </Row>
    </div>
  );
};
