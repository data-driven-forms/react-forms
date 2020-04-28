import get from 'lodash/get';

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const submitFunction = async (values, formApi) => {
  const myFile = get(values, formApi.fileInputs[0]); // there can be multiple inputs of this type
  const fileFakePath = myFile.inputValue; // the fake path shown as the input value
  const fileList = myFile.inputFiles; // list of file renferences that should be uploaded to somewhere
  const base64Encoded = await toBase64(fileList[0]); // files list is always an array
  const formData = new FormData();
  formData.append(formApi.fileInputs[0], fileList[0]);
  return {
    base64Encoded,
    formData
  };
};

export default submitFunction;
