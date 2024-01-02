import axios from "axios";

export const cartDetails = async () => {
  try {
    const backend_Url = process.env.REACT_APP_BACKEND_URL;
    const headers = { Authorization: localStorage.getItem("token") };
    const response = await axios.get(`${backend_Url}/user/cart`, {
      headers,
    });
    return response.data.data || [];
  } catch (error) {
    throw error;
  }
};
