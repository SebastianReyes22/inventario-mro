import { Button } from 'react-bootstrap';
import ExcelJS from 'exceljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export const ButtonDownload = props => {
  const exportFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reporte de asistencia');

    sheet.columns = [
      {
        header: 'Item Code',
        key: 'code',
      },
      {
        header: 'Descripción en inglés',
        key: 'description',
      },
      {
        header: 'Descripción',
        key: 'descripcion',
      },
      {
        header: 'Ubicación',
        key: 'ubicacion',
      },
      // {
      //   header: 'Imagen',
      //   key: 'imagen',
      //   width: 100, // Set the column width for the images (adjust as needed)
      // },
      {
        header: 'Cantidad',
        key: 'cantidad',
      },
    ];

    props.inventory.forEach(item => {
      const {
        item_code,
        descripcion_ingles,
        descripcion,
        ubicacion,
        // imagen,
        cantidad,
      } = item;

      // // Remove the 'data:image/jpeg;base64,' prefix from the image data
      // const imageData = imagen
      //   ? imagen.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
      //   : null;

      // Add the image as a base64 data directly to the 'imagen' column (without the 'data:image/jpeg;base64,' prefix)
      sheet.addRow({
        code: item_code,
        description: descripcion_ingles,
        descripcion,
        ubicacion,
        // imagen: imageData ? { base64: imageData } : null,
        cantidad,
      });
    });

    workbook.xlsx.writeBuffer().then(inventory => {
      const blob = new Blob([inventory], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');

      anchor.href = url;
      anchor.download = 'Reporte de inventario.xlsx';
      anchor.click();

      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className='d-grid gap-2'>
      <Button variant='success' onClick={exportFile}>
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  );
};
