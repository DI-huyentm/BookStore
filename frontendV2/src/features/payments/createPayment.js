import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPayment } from "../../services/users/paymentAPI";
import { toast } from "react-hot-toast";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  const { mutate: createPayment, isPending: isCreating } = useMutation({
    mutationFn: createNewPayment,
    onSuccess: () => {
      toast.success("Tạo đơn hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
    onError: () => toast.error("Tạo đơn hàng thất bại!"),
  });

  return { isCreating, createPayment };
}
