import { Layout } from '../../components/ui';
import { Reports } from '../../components/reports';
import { Card } from 'react-bootstrap';

export const ReportPage = () => {
  return (
    <Layout>
      <Card.Header>Reporte de inventario</Card.Header>
      <Card.Body>
        <Reports />
      </Card.Body>
    </Layout>
  );
};
