import axios from 'axios';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const InputLocation = props => {
  const getLocations = async () => {
    let formData = new FormData();
    formData.append('option', 'getLocations');

    await axios
      .post(props.URI, formData)
      .then(response => {
        if (response.data.locations === false) {
          props.setLocation([]);
          console.log('sin ubicaciones');
        } else {
          props.setLocation(response.data);
        }
      })
      .catch(error => {
        console.log('Error al consultar las plantas ' + error);
      });
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      <Form.Label>Ubicacion</Form.Label>
      <Form.Select
        value={props.locationSelected}
        onChange={e => props.setLocationSelected(e.target.value)}>
        <option value=''>Seleccione ubicación</option>
        {props.location.map(item => (
          <option key={item.id_ubicacion} value={item.nombre_ubicacion}>
            {item.nombre_ubicacion}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};
