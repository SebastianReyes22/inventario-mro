import { DeleteItem } from '../../components/item';
import { Layout } from '../../components/ui';
import { Card } from 'react-bootstrap';

export const DeleteItemPage = () => {
  return (
    <Layout>
      <Card.Header>Elimiar item del inventario</Card.Header>
      <Card.Body>
        <DeleteItem />
      </Card.Body>
    </Layout>
  );
};
