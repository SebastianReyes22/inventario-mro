export const convertToBase64 = files => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      const base64 = reader.result;
      resolve(base64);
    };
  });
};
