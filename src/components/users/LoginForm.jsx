import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, InputGroup } from 'react-bootstrap';

export const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { logIn } = useUserAuth();

  let email = '';

  const handleSubmit = async e => {
    e.preventDefault();

    email = user + '@poscomppc.com';
    try {
      await logIn(email, password);
      navigate('/inventario');
    } catch (err) {
      alert('Datos incorrectos');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mt-3'>
        <InputGroup.Text id='basic-addon1'>
          <FontAwesomeIcon icon={faUser} />
        </InputGroup.Text>
        <Form.Control
          type='text'
          placeholder='usuario'
          value={user}
          onChange={e => setUser(e.target.value)}
        />
      </InputGroup>
      <InputGroup className='mt-3 mb-3'>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faLock} />
        </InputGroup.Text>
        <Form.Control
          type='password'
          placeholder='********'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </InputGroup>
      <div className='d-grid gap-2'>
        <Button variant='success' type='submit'>
          Ingresar
        </Button>
      </div>
    </Form>
  );
};
