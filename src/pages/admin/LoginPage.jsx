import { Card, Container } from 'react-bootstrap';
import { LoginForm } from '../../components/users/LoginForm';

export const LoginPage = () => {
  return (
    <Container fluid className='form-center'>
      <Card>
        <Card.Header className='login-title'>Sistema de Inventarios de MRO</Card.Header>
        <Card.Body>
          <LoginForm />
        </Card.Body>
      </Card>
    </Container>
  );
};
