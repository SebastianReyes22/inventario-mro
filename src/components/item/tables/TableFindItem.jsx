import { Table } from 'react-bootstrap';

export const TableFindItem = props => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Descripción (Español)</th>
          <th>Descripción (Ingles)</th>
          <th>Ubicación</th>
          <th>Nivel</th>
          <th>Cantidad</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        {props.inventory.map(item => (
          <tr key={item.id_inventario}>
            <td>{item.item_code}</td>
            <td>{item.descripcion_ingles}</td>
            <td>{item.descripcion}</td>
            <td>{item.ubicacion}</td>
            <td>{item.nivel}</td>
            <td>{item.cantidad}</td>
            <td className='td-img'>
              <a href='#' onClick={() => props.openModal(item.imagen)}>
                <img className='table-img' src={item.imagen} alt={item.item_code} />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
