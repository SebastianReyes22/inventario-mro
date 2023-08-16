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

    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFCC00' },
      };
    });

    props.inventory.forEach(item => {
      const { item_code, descripcion_ingles, descripcion, ubicacion, cantidad } = item;

      sheet.addRow({
        code: item_code,
        description: descripcion_ingles,
        descripcion,
        ubicacion,
        cantidad,
      });

      // auto size the column width to fit the content
      sheet.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
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
      <Button variant='success' onClick={exportFile} disabled={props.isLoading}>
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  );
};
