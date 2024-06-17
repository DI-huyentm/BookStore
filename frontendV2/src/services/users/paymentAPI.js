import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchPaymentByUserId(userId) {
  const response = await axios.get(`${BASE_URL}/sales/${userId}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.sales;
}

export async function createNewPayment(data) {
  const response = await axios.post(`${BASE_URL}/sales`, data);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.new_sale;
}
