import React from 'react';
import { Card } from 'react-bootstrap';
import { Layout } from '../../components/ui';
import { Movimientos } from '../../components/reports';

export const MovimientosPage = () => {
  return (
    <Layout>
      <Card.Header>Historial de movimientos</Card.Header>
      <Card.Body>
        <Movimientos />
      </Card.Body>
    </Layout>
  );
};
