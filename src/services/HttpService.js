import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    Swal.fire({
      title: "Oops!",
      text: "An Unexpected error occurred",
      icon: "error",
      confirmButtonColor: "#0e0eaf",
      confirmButtonText: "Ok",
    });
    console.log(error);
  }
  return Promise.reject(error);
});

const config = () => {
  let configObject = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  return configObject;
};

const HttpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  config: config,
};

export default HttpService;
