import { Button, Form, Table } from 'react-bootstrap';

export const TableEditProduct = props => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: '10%' }}>Item Code</th>
          <th style={{ width: '15%' }}>Descripción (Español)</th>
          <th style={{ width: '15%' }}>Descripción (Ingles)</th>
          <th style={{ width: '10%' }}>Stock</th>
          <th style={{ width: '15%' }}>Cantidad a modificar</th>
          <th style={{ width: '25%' }}>Obserbación</th>
          <th style={{ width: '5%' }}>Añadir</th>
          <th style={{ width: '5%' }}>Quitar</th>
        </tr>
      </thead>
      <tbody>
        {props.inventory.map(item => (
          <tr key={item.id_inventario}>
            <td>{item.item_code}</td>
            <td>{item.descripcion}</td>
            <td>{item.descripcion_ingles}</td>
            <td>{item.cantidad}</td>
            <td>
              <Form.Control
                type='number'
                value={props.itemQuantities[item.id_inventario] || 0}
                min={0}
                onChange={e => {
                  const newQuantity = parseInt(e.target.value);
                  props.setItemQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [item.id_inventario]: isNaN(newQuantity) ? 0 : newQuantity,
                  }));
                }}
              />
            </td>
            <td>
              <Form.Control
                type='text'
                value={props.itemObservations[item.id_inventario] || ''}
                onChange={e => {
                  const newObservation = e.target.value;
                  props.setItemObservations(prevObservations => ({
                    ...prevObservations,
                    [item.id_inventario]: newObservation,
                  }));
                }}
              />
            </td>
            <td>
              <div className='d-flex justify-content-center'>
                <Button variant='primary' onClick={e => props.handleAdd(e, item)}>
                  +
                </Button>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-center'>
                <Button variant='danger' onClick={e => props.handleDelete(e, item)}>
                  -
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
