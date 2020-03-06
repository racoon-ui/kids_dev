import axios from 'axios';

export async function uploadFile(files, params) {
  return axios.post('/file/upload', { files, params });
}
