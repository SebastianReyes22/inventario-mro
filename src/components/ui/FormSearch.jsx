import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FormSearch = ({
  children,
  handleSubmit,
  product,
  setProduct,
  isLoading,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className='col-10'>
          <Form.Control
            type='text'
            placeholder='Item Code a buscar (QX00000)'
            value={product}
            onChange={e => setProduct(e.target.value)}
          />
        </Col>
        <Col className='col-2'>
          <div className='d-grid gap-2'>
            <Button variant='primary' type='submit' disabled={isLoading}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
        </Col>
      </Row>
      {children}
    </Form>
  );
};
