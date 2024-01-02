import axios from "axios";

export const cartDelete = async () => {
  try {
    const backend_Url = process.env.REACT_APP_BACKEND_URL;
    const headers = { Authorization: localStorage.getItem("token") };
    const response = await axios.delete(`${backend_Url}/user/cart/removeAll`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error in cartDetails API:", error);
    throw error;
  }
};
