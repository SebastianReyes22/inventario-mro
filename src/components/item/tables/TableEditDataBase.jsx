import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Row, Table } from 'react-bootstrap';

export const TableEditDataBase = props => {
  const [editStates, setEditStates] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = item => {
    setIsEditing(true);
    setEditStates({
      ...editStates,
      [item.item_code]: item.item_code,
      [item.descripcion]: item.descripcion,
      [item.descripcion_ingles]: item.descripcion_ingles,
      [item.ubicacion]: item.ubicacion,
      [item.nivel]: item.nivel,
      [item.cantidad]: item.cantidad,
    });
  };

  const handleSaveClick = async item => {
    if (
      editStates[item.item_code] === '' ||
      editStates[item.descripcion] === '' ||
      editStates[item.descripcion_ingles] === '' ||
      editStates[item.ubicacion] === '' ||
      editStates[item.nivel] === '' ||
      editStates[item.cantidad] === ''
    ) {
      alert('Error, no se puede dejar campos vacios');
      return;
    }

    let formData = new FormData();
    formData.append('option', 'updateProductDB');
    formData.append('id_inventario', item.id_inventario);
    formData.append('item_code', editStates[item.item_code]);
    formData.append('descripcion', editStates[item.descripcion]);
    formData.append('descripcion_ingles', editStates[item.descripcion_ingles]);
    formData.append('ubicacion', editStates[item.ubicacion]);
    formData.append('nivel', editStates[item.nivel]);
    formData.append('cantidad', editStates[item.cantidad]);

    await axios.post(props.URI, formData).then(response => {
      if (response.data.updateProduct === false) {
        alert('Error, no se pudo actualizar el producto');
      } else {
        alert('Producto actualizado correctamente');
        window.location.reload();
      }
    });

    setEditStates({});
    setIsEditing(false);
  };

  return (
    <Row className='mt-4 scrollable-container'>
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
            <th>Guardar</th>
          </tr>
        </thead>
        <tbody>
          {props.inventory.map(item => (
            <tr key={item.id_inventario}>
              <td>
                {isEditing ? (
                  <Form.Control
                    type='text'
                    value={editStates[item.item_code]}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.item_code]: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.item_code
                )}
              </td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type='text'
                    value={editStates[item.descripcion]}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.descripcion]: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.descripcion
                )}
              </td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type='text'
                    value={editStates[item.descripcion_ingles]}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.descripcion_ingles]: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.descripcion_ingles
                )}
              </td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type='text'
                    value={editStates[item.ubicacion]}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.ubicacion]: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.ubicacion
                )}
              </td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type='text'
                    value={editStates[item.nivel]}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.nivel]: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.nivel
                )}
              </td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type='number'
                    min={0}
                    value={editStates[item.cantidad]}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.cantidad]: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.cantidad
                )}
              </td>
              <td className='td-img'>
                <a href='#' onClick={() => props.openModal(item.imagen)}>
                  <img className='table-img' src={item.imagen} alt={item.item_code} />
                </a>
              </td>
              <td>
                <div className='d-grid gap-2'>
                  {isEditing ? (
                    <Button variant='primary' onClick={() => handleSaveClick(item)}>
                      <FontAwesomeIcon icon={faSave} />
                    </Button>
                  ) : (
                    <Button variant='warning' onClick={() => handleEditClick(item)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
};
