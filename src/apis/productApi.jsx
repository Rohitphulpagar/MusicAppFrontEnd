import axios from "axios";

export const productData = async (filters) => {
  try {
    const backend_Url = process.env.REACT_APP_BACKEND_URL;
    const filterParams = new URLSearchParams(filters).toString();
    const response = await axios.get(
      `${backend_Url}/user/products?${filterParams}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
