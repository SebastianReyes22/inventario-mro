import axios from 'axios';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const InputLevel = props => {
  const getLevels = async () => {
    let formData = new FormData();
    formData.append('option', 'getLevels');

    await axios
      .post(props.URI, formData)
      .then(response => {
        if (response.data.locations === false) {
          props.setLevel([]);
          console.log('sin niveles');
        } else {
          props.setLevel(response.data);
        }
      })
      .catch(error => {
        console.log('Error al consultar las plantas ' + error);
      });
  };

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <div>
      <Form.Label>Nivel</Form.Label>
      <Form.Select
        value={props.levelSelected}
        onChange={e => props.setLevelSelected(e.target.value)}>
        <option value=''>Seleccione nivel</option>
        {props.level.map(item => (
          <option key={item.id_nivel} value={item.nombre_nivel}>
            {item.nombre_nivel}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};
