import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateCustomerDailogState } from "./state";
import { toast } from "sonner";
import { ICustomerModel } from "@/model/customer_model";
import { api_create_update_customer } from "@/network/apis/customer_api";

export const customerAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
  state: z.string({ required_error: "State is required." }),
  carrier: z.string({ required_error: "Carrier is required." }),
  phone: z.string({ required_error: "Phone is required." }).optional(),
  lead_id: z.string({ required_error: "Lead id is required." }),
});

export const useAddCustomerDailogCtrl = ({
  onClose,
  customer,
}: {
  onClose: (v: boolean) => void;
  customer?: ICustomerModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateCustomerDailogState();

  const form = useForm<z.infer<typeof customerAddUpdateFormSchema>>({
    resolver: zodResolver(customerAddUpdateFormSchema),
    defaultValues: {
      name: customer ? `${customer.name}` : undefined,
      state: customer ? `${customer.state}` : undefined,
      carrier: customer ? `${customer.carrier}` : undefined,
      lead_id: customer ? `${customer.lead_id}` : undefined,
      phone: customer ? `${customer.phone}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof customerAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_create_update_customer({
      ...values,
      id: !customer ? 0 : customer.id,
    });

    if (res.s) {
      onClose(true);
    } else {
      toast(res?.m ?? "Opps! something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
