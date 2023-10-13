import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../src/context/UserAuthContext';

export const login = async (user, password) => {
  const navigate = useNavigate();

  const { logIn } = useUserAuth();

  let email = '';

  email = user + '@poscomppc.com';

  try {
    await logIn(email, password);
    navigate('/inventario');
  } catch (err) {
    alert('Datos incorrectos');
  }
};
