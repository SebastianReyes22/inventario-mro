import { Button } from 'react-bootstrap';
import ExcelJS from 'exceljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export const ButtonDownloadMovimientos = props => {
  const exportFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reporte de movimientos');

    sheet.columns = [
      {
        header: 'Usuario',
        key: 'usuario',
      },
      {
        header: 'Item',
        key: 'item',
      },
      {
        header: 'Tipo de movimiento',
        key: 'tipo',
      },
      {
        header: 'Cantidad',
        key: 'cantidad',
      },
      {
        header: 'Comentario',
        key: 'comentario',
      },
      {
        header: 'Fecha de movimiento',
        key: 'fecha',
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

    props.movimientos.forEach(itemMovimiento => {
      const { usuario, item, tipo_movimiento, cantidad, comentario, fecha_movimiento } =
        itemMovimiento;

      sheet.addRow({
        usuario,
        item,
        tipo: tipo_movimiento,
        cantidad,
        comentario,
        fecha: fecha_movimiento,
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
      anchor.download = 'Reporte de movimientos.xlsx';
      anchor.click();

      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className='d-grid gap-2 mt-4'>
      <Button variant='success' onClick={exportFile} disabled={props.isLoading}>
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  );
};
