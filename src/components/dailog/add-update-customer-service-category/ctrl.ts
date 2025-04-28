import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateCustomerDailogState } from "./state";
import { toast } from "sonner";
import ICustomerServiceCategoryModel from "@/model/customer_service_category_model";
import { api_create_update_category } from "@/network/apis/customer-service/category_api";

export const customerAddUpdateFormSchema = z.object({
  title: z.string({ required_error: "Title is required." }).min(2, {
    message: "Title must be at least 1 characters.",
  }),
  script: z.string({ required_error: "Script is required." }),
  tld_key: z.string({ required_error: "tld_key is required." }),
});

export const useAddCategoryDailogCtrl = ({
  onClose,
  category,
}: {
  onClose: (v: boolean) => void;
  category?: ICustomerServiceCategoryModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateCustomerDailogState();

  const form = useForm<z.infer<typeof customerAddUpdateFormSchema>>({
    resolver: zodResolver(customerAddUpdateFormSchema),
    defaultValues: {
      title: category ? `${category.title}` : undefined,
      script: category ? `${category.script}` : undefined,
      tld_key: category ? `${category.tld_key}` : undefined
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof customerAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_create_update_category({
      ...values,
      id: !category ? 0 : category.id,
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
