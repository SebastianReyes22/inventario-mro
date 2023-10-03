import { useState } from 'react';
import axios from 'axios';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Row, Table } from 'react-bootstrap';
import { convertToBase64 } from '../../ui';

export const TableEditDataBase = props => {
  const [editStates, setEditStates] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = item => {
    setIsEditing(true);
    setEditStates({
      ...editStates,
      [item.id_inventario]: {
        item_code: item.item_code,
        descripcion: item.descripcion,
        descripcion_ingles: item.descripcion_ingles,
        ubicacion: item.ubicacion,
        nivel: item.nivel,
        cantidad: item.cantidad,
        imagen: item.imagen,
      },
    });
  };

  const handleSaveClick = async item => {
    if (
      editStates[item.id_inventario].item_code === '' ||
      editStates[item.id_inventario].descripcion === '' ||
      editStates[item.id_inventario].descripcion_ingles === '' ||
      editStates[item.id_inventario].ubicacion === '' ||
      editStates[item.id_inventario].nivel === '' ||
      editStates[item.id_inventario].cantidad === ''
    ) {
      alert('Error, no se puede dejar campos vacios');
      return;
    }

    let base64 = '';

    if (document.querySelector('input[type="file"]').files.length === 0) {
      base64 = editStates[item.id_inventario].imagen;
    } else {
      base64 = await convertToBase64(document.querySelector('input[type="file"]').files);
    }

    let formData = new FormData();
    formData.append('option', 'updateProductDB');
    formData.append('id_inventario', item.id_inventario);
    formData.append('item_code', editStates[item.id_inventario].item_code);
    formData.append('descripcion', editStates[item.id_inventario].descripcion);
    formData.append(
      'descripcion_ingles',
      editStates[item.id_inventario].descripcion_ingles,
    );
    formData.append('ubicacion', editStates[item.id_inventario].ubicacion);
    formData.append('nivel', editStates[item.id_inventario].nivel);
    formData.append('cantidad', editStates[item.id_inventario].cantidad);
    formData.append('imagen', base64);

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
                    value={editStates[item.id_inventario]?.item_code}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.id_inventario]: {
                          ...editStates[item.id_inventario],
                          item_code: e.target.value,
                        },
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
                    value={editStates[item.id_inventario]?.descripcion}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.id_inventario]: {
                          ...editStates[item.id_inventario],
                          descripcion: e.target.value,
                        },
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
                    value={editStates[item.id_inventario]?.descripcion_ingles}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.id_inventario]: {
                          ...editStates[item.id_inventario],
                          descripcion_ingles: e.target.value,
                        },
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
                    value={editStates[item.id_inventario]?.ubicacion}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.id_inventario]: {
                          ...editStates[item.id_inventario],
                          ubicacion: e.target.value,
                        },
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
                    value={editStates[item.id_inventario]?.nivel}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.id_inventario]: {
                          ...editStates[item.id_inventario],
                          nivel: e.target.value,
                        },
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
                    value={editStates[item.id_inventario]?.cantidad}
                    onChange={e =>
                      setEditStates({
                        ...editStates,
                        [item.id_inventario]: {
                          ...editStates[item.id_inventario],
                          cantidad: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  item.cantidad
                )}
              </td>
              <td className='td-img'>
                {isEditing ? (
                  <Form.Control
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={e => convertToBase64(e.target.files)}
                  />
                ) : (
                  <a href='#' onClick={() => props.openModal(item.imagen)}>
                    <img className='table-img' src={item.imagen} alt={item.item_code} />
                  </a>
                )}
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
