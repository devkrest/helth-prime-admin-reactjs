import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateModuleDailogState } from "./state";
import { toast } from "sonner";
import { IModuleModel } from "@/model/module_model";
import { api_create_update_module } from "@/network/apis/module_api";

export const moduleAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
  description: z.string({ required_error: "Description is required." }).min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export const useAddModuleDailogCtrl = ({
  onClose,
  module,
}: {
  onClose: (v: boolean) => void;
  module?: IModuleModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateModuleDailogState();

  const form = useForm<z.infer<typeof moduleAddUpdateFormSchema>>({
    resolver: zodResolver(moduleAddUpdateFormSchema),
    defaultValues: {
      name: module ? `${module.name}` : undefined,
      description: module ? `${module.description}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof moduleAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_create_update_module({
      ...values,
      id: !module ? 0 : module.id,
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
