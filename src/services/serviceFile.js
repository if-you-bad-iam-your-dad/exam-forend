import Axios from "axios";

export const LoginServiceApi = (userName,password) => {
  const LoginUrl = process.env.REACT_APP_BACKEND_URL + `auth/login`;
  const data = {
     user_name: userName,
     password: password
  }
  const headers = {
    "Content-Type": "application/json",
  }
  return Axios.post(LoginUrl,data,{headers: headers});
}





