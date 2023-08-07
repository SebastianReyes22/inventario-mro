import { Table } from 'react-bootstrap';

export const TableReports = props => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Description (English)</th>
          <th>Descripción (Español)</th>
          <th>Ubicación</th>
          <th>Imagen</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {props.inventory.map(item => (
          <tr key={item.id_inventario}>
            <td>{item.item_code}</td>
            <td>{item.descripcion_ingles}</td>
            <td>{item.descripcion}</td>
            <td>{item.ubicacion}</td>
            <td className='td-img'>
              <img className='table-img' src={item.imagen} alt={item.nombre} />
            </td>
            <td>{item.cantidad}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
