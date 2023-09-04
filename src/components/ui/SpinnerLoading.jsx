import { Spinner } from 'react-bootstrap';

export const SpinnerLoading = () => {
  return (
    <div className='spinner-container'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Cargando...</span>
      </Spinner>
    </div>
  );
};
