const axios = require("axios");
const Formdata = require("form-data");

const host = `http://3.37.53.134:3000`;

export const getFileHash = (file) => {
  const formdata = new Formdata();
  formdata.append("attachment", file);
  return axios.request({
    method: "POST",
    url: `${host}/sendHash`,
    data: formdata,
  });
};

export const uploadFile = (file) => {
  const formdata = new Formdata();
  formdata.append("attachment", file);
  return axios.request({
    method: "POST",
    url: `${host}/uploadFileWithOriginalFilename`,
    data: formdata,
  });
};

export const getFileFromNFT = (nft) => {
  return axios.request({
    method: "POST",
    url: `${host}/sendFile`,
    data: {
      nft,
    },
  });
};
