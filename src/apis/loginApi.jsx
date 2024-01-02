import axios from "axios";

export const login = async (userName, password) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
    const reqPayload = {
      userName: userName,
      password: password,
    };

    const response = await axios.post(reqUrl, reqPayload);
    localStorage.setItem("token", response.data.jwtToken);
    return response.data;
  } catch (error) {
    console.error("Error during login: ", error);
    throw error;
  }
};
