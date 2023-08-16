import { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useUserAuth } from '../../context/UserAuthContext';

export const NewUserFirebase = () => {
  const { newUser } = useUserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await newUser(email, password, displayName);
      setIsLoading(false);
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Form onSubmit={handleSignUp}>
          <Row className='mb-2'>
            <Col className='col-4'>
              <Form.Control
                type='email'
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
            <Col className='col-4'>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
              />
            </Col>
            <Col className='col-4'>
              <Form.Control
                type='text'
                placeholder='Display Name'
                onChange={e => setDisplayName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-8' />
            <Col className='col-4'>
              <div className='d-grid gap-2'>
                <Button type='submit'>Crear Usuario</Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};
