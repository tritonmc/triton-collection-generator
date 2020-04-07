import fileDownload from 'js-file-download';

export const getFileContents = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('abort', () => reject(new Error('file reading was aborted')));
    reader.addEventListener('error', () => reject(new Error('file reading has failed')));
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsText(file, 'utf-8');
  });

export const getAllFileContents = async (files) => {
  const result = {};
  await Promise.all(
    files.map(async (file) => {
      result[file.name] = await getFileContents(file);
    })
  );
  return result;
};

export const downloadFiles = (files) =>
  files.forEach((file) => fileDownload(file.content, file.fileName));
