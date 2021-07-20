import http from "./HttpService";
// Login API Call
const LoginUser = async (user) => {
  try {
    const response = await http.post("system-login", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const IsAuthenticated = async () => {
  try {
    const response = await http.get("is-user-authenticated", http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetTeacherUsersList = async (DepartmentId = null) => {
  try {
    let url = "get-teachers";
    if (DepartmentId != null) url = url + "?DepartmentId=" + DepartmentId;

    const response = await http.get(url, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const RegisterUser = async (user) => {
  try {
    let url = "system-register";
    if ("id" in user) url = "update-user";

    const response = await http.post(url, user, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const DeleteUser = async (Id) => {
  try {
    let url = "delete-user?Id=" + Id;
    const response = await http.post(url, {}, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  LoginUser,
  IsAuthenticated,
  GetTeacherUsersList,
  RegisterUser,
  DeleteUser,
};
export default AuthService;
