import { NewProduct } from '../../components/item';
import { Layout } from '../../components/ui';
import { Card } from 'react-bootstrap';

export const NewProductPage = () => {
  return (
    <Layout>
      <Card.Header>Nuevo producto</Card.Header>
      <Card.Body>
        <NewProduct />
      </Card.Body>
    </Layout>
  );
};
