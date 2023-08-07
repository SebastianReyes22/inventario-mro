import { Route, Routes } from 'react-router-dom';
import { EditProductPage, LoginPage, NewProductPage, ReportPage } from '../pages/admin';
import { FindItemPage } from '../pages/guest';
import ProtectedRoutes from './ProtectedRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<LoginPage />} />
      <Route path='*' element={<h1>Page not found 404</h1>} />

      <Route path='/buscar' element={<FindItemPage />} />

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
    </Routes>
  );
};
