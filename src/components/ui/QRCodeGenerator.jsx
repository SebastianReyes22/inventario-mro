import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

export const QRCodeGenerator = props => {
  const { qrValue } = props;

  const generateQRCode = () => {
    if (qrValue) {
      QRCode.toDataURL(qrValue, (err, dataUrl) => {
        if (err) {
          console.error(err);
          return;
        }

        const fileName = `QRCode_${qrValue}_.png`;

        const blob = dataURLToBlob(dataUrl);

        saveAs(blob, fileName);
      });
    }
  };

  const dataURLToBlob = dataURL => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <div className='d-grid gap-2'>
      <Button variant='info' onClick={generateQRCode}>
        <FontAwesomeIcon icon={faQrcode} />
      </Button>
    </div>
  );
};
