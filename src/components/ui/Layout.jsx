import { Sidebar } from './Sidebar';
import { Card, Container } from 'react-bootstrap';

export const Layout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Sidebar />
      <Container fluid className='container-box'>
        <Card>{children}</Card>
      </Container>
    </div>
  );
};
