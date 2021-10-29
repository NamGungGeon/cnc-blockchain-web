export const downloadUrlFile = url => {
  const a = document.createElement("a");
  a.target = "_blank";
  a.href = url;

  a.click();
  a.remove();
};
export const saveBlobToFile = (blobData, type) => {
  const blob = new Blob(blobData, { type });
  downloadUrlFile(URL.createObjectURL(blob));
};
