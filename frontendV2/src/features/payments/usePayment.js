import { useQuery } from "@tanstack/react-query";
import { fetchPaymentByUserId } from "../../services/users/paymentAPI";

export function usePayment(userId) {
  const {
    data: payment,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment", userId],
    queryFn: () => fetchPaymentByUserId(userId),
  });

  return { isLoading, isError, error, payment };
}
