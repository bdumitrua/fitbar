import axios from "axios";

// TODO
// Брать адрес из env
const ApiUrl = "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL: ApiUrl,
});

axiosInstance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

export default axiosInstance;
