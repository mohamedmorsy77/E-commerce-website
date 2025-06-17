import axios from "axios";




const axiosInstance = axios.create({
  baseURL: 'https://ecommerce.routemisr.com/api/v1',
  headers: {"Content-Type": "application/json",}
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(config)
  if (token) {
    config.headers.token = token;
  }
  return config;
});




export default axiosInstance;