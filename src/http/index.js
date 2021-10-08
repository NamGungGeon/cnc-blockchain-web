const axios = require("axios");
const Formdata = require("form-data");

const host = `http://3.37.53.134:3004`;

export const getFileHash = (file) => {
  const formdata = new Formdata();
  formdata.append("attachment", file);
  return axios.request({
    method: "POST",
    url: `${host}/files/hash`,
    data: formdata,
  });
};

export const uploadFile = (file) => {
  const formdata = new Formdata();
  formdata.append("attachment", file);
  return axios.request({
    method: "POST",
    url: `${host}/files`,
    data: formdata,
  });
};

export const getFileFromNFT = (nft) => {
  return axios.request({
    method: "GET",
    url: `${host}/files/${nft}`,
  });
};
