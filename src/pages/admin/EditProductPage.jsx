import { Card } from 'react-bootstrap';
import { Layout } from '../../components/ui';
import { EditProduct } from '../../components/item';

export const EditProductPage = () => {
  return (
    <Layout>
      <Card.Header>Modificar Inventario</Card.Header>
      <Card.Body>
        <EditProduct />
      </Card.Body>
    </Layout>
  );
};
