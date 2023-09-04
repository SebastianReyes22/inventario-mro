import { Route, Routes } from 'react-router-dom';
import {
  CreateNewUserPage,
  DeleteItemPage,
  EditDataBasePage,
  EditProductPage,
  LoginPage,
  MovimientosPage,
  NewProductPage,
  ReportPage,
} from '../pages/admin';
import { FindItemPage } from '../pages/guest';
import ProtectedRoutes from './ProtectedRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<LoginPage />} />
      <Route path='*' element={<h1>Page not found 404</h1>} />

      <Route path='/buscar' element={<FindItemPage />} />

      <Route path='/new-user' element={<CreateNewUserPage />} />

      {/* Private routes */}
      <Route
        path='/inventario'
        element={
          <ProtectedRoutes>
            <ReportPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path='/nuevo-producto'
        element={
          <ProtectedRoutes>
            <NewProductPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path='/modificar-inventario'
        element={
          <ProtectedRoutes>
            <EditProductPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path='/movimientos'
        element={
          <ProtectedRoutes>
            <MovimientosPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path='/eliminar'
        element={
          <ProtectedRoutes>
            <DeleteItemPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path='/item-db'
        element={
          <ProtectedRoutes>
            <EditDataBasePage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};
