import { Card } from 'react-bootstrap';
import { Layout } from '../../components/ui';
import { EditDataBase } from '../../components/item';

export const EditDataBasePage = () => {
  return (
    <Layout>
      <Card.Header>Modificar Base de Datos</Card.Header>
      <Card.Body>
        <EditDataBase />
      </Card.Body>
    </Layout>
  );
};
