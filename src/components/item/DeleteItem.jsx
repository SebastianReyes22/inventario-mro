import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

export const DeleteItem = () => {
  // const URI = import.meta.env.VITE_APP_API;
  // const [inventory, setInventory] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const [itemCode, setItemCode] = useState('');

  // const getInventory = async () => {
  //   let formData = new FormData();
  //   formData.append('option', 'inventario');

  //   setIsLoading(true);

  //   await axios
  //     .post(URI, formData)
  //     .then(response => {
  //       if (response.data.inventory === false) {
  //         setInventory([]);
  //         console.log('Sin items');
  //       } else {
  //         setInventory(response.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getInventory();
  // }, []);

  return (
    // <div className='scrollable-container'>
    //   <Table striped bordered hover>
    //     <thead>
    //       <tr>
    //         <th>Item Code</th>
    //         <th>Descripción (Español)</th>
    //         <th>Descripción (Ingles)</th>
    //         <th>Ubicación</th>
    //         <th>Stock</th>
    //         <th>Imágen</th>
    //         <th>Guardar</th>
    //         <th>Editar</th>
    //         <th>Borrar</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {inventory.map(item => (
    //         <tr key={item.id_inventario}>
    //           <td>
    //             <Form.Control
    //               type='text'
    //               value={item.item_code}
    //               onChange={e => setItemCode(e.target.value)}
    //             />
    //           </td>
    //           <td>{item.descripcion}</td>
    //           <td>{item.descripcion_ingles}</td>
    //           <td>{item.ubicacion}</td>
    //           <td>{item.cantidad}</td>
    //           <td className='td-img'>
    //             <img className='table-img' src={item.imagen} alt={item.item_code} />
    //           </td>
    //           <td>
    //             <Button variant='primary'>
    //               <FontAwesomeIcon icon={faSave} />
    //             </Button>
    //           </td>
    //           <td>
    //             <Button variant='warning'>
    //               <FontAwesomeIcon icon={faEdit} />
    //             </Button>
    //           </td>
    //           <td>
    //             <Button variant='danger'>
    //               <FontAwesomeIcon icon={faTrash} />
    //             </Button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </Table>
    // </div>
    <div className='d-flex justify-content-center'>
      <img
        style={{ width: '50%' }}
        src='https://uploads-ssl.webflow.com/5c471c24395cd54f559228e5/5d1623691e99cd415d15fc95_Page-under-construction_kompuestos.gif'
        alt='En desarrollo'
      />
    </div>
  );
};
