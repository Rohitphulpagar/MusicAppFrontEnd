import axios from "axios";

export const addTocart = async (productId, quantity) => {
  try {
    const backend_Url = process.env.REACT_APP_BACKEND_URL;
    const headers = { Authorization: localStorage.getItem("token") };

    const response = await axios.post(
      `${backend_Url}/user/cart/add`,
      {
        productId,
        quantity,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
