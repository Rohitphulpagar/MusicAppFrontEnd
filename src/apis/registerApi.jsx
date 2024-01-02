import axios from "axios";

export const registers = async (name, mobile, email, password) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/user/register`;
    const reqPayload = {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    };
    const response = await axios.post(reqUrl, reqPayload);
    localStorage.setItem("token", response.data.jwtToken);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
