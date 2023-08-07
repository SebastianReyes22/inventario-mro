import { FindItem } from '../../components/find-item';
import { Layout } from '../../components/ui';
import { Card } from 'react-bootstrap';

export const FindItemPage = () => {
  return (
    <Layout>
      <Card.Header>Buscar Producto</Card.Header>
      <Card.Body>
        <FindItem />
      </Card.Body>
    </Layout>
  );
};
