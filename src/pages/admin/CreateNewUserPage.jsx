import { Layout } from '../../components/ui';
import { Card } from 'react-bootstrap';
import { NewUserFirebase } from '../../components/users';

export const CreateNewUserPage = () => {
  return (
    <Layout>
      <Card.Header>Nuevo Usuario Firebase</Card.Header>
      <Card.Body>
        <NewUserFirebase />
      </Card.Body>
    </Layout>
  );
};
