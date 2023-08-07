import { Sidebar } from './Sidebar';
import { Card, Container } from 'react-bootstrap';

export const Layout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Sidebar />
      <Container fluid className='mt-4'>
        <Card>{children}</Card>
      </Container>
    </div>
  );
};
