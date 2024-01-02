import axios from "axios";

export const productDetail = async (productId) => {
  try {
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.get(
      `${backend_url}/user/products/${productId}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
