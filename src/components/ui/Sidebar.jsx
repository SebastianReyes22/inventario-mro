import { faEdit, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faAdd, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { useEffect } from 'react';

export const Sidebar = () => {
  const linksArray = [
    {
      id: 1,
      label: 'Reporte de Inventario',
      to: '/inventario',
      icon: faFileAlt,
    },
    {
      id: 2,
      label: 'Modificar Invenario',
      to: '/modificar-inventario',
      icon: faEdit,
    },
    {
      id: 3,
      label: 'Nuevo Producto',
      to: '/nuevo-producto',
      icon: faAdd,
    },
    {
      id: 4,
      label: 'Buscar Producto',
      to: '/buscar',
      icon: faSearch,
    },
    {
      id: 5,
      label: 'Reporte de Movimientos',
      to: '/movimientos',
      icon: faFileAlt,
    },
    // {
    //   id: 6,
    //   label: 'Eliminar item',
    //   to: '/eliminar',
    //   icon: faTrash,
    // },
  ];

  const { pathname } = useLocation();
  const isActive = location.pathname;

  const { logOut } = useUserAuth();

  const closeSession = async () => {
    if (window.confirm('¿Realmente quieres cerrar sesión?')) {
      try {
        await logOut();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const closeSessionIn24Hrs = async () => {
    try {
      await logOut();
      console.log('Sesión cerrada por inactividad');
    } catch (err) {
      console.log(err);
    }
  };

  const tiempoEspera = 86400;

  useEffect(() => {
    const timeoutId = setTimeout(closeSessionIn24Hrs, tiempoEspera * 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='sidebar-container'>
      <h2 className='sidebar-title'>Inventario de MRO</h2>
      {linksArray.map(link => (
        <div className={'sidebar-div'} key={link.id}>
          <NavLink
            className={({ isActive }) => `sidebar-link ${isActive ? `active` : ``}`}
            key={link.id}
            to={link.to}>
            <FontAwesomeIcon className='sidebar-icon' icon={link.icon} />
            <span>{link.label}</span>
          </NavLink>
        </div>
      ))}
      <div className='d-grid gap-2 p-2'>
        <Button
          className='sidebar-button'
          variant='outline-danger'
          onClick={closeSession}>
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};
