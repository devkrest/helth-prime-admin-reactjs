import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateRoleDailogState } from "./state";
import { toast } from "sonner";
import { IRoleModel } from "@/model/role_model";
import { api_create_update_role } from "@/network/apis/role_api";

export const roleAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
});

export const useAddRoleDailogCtrl = ({
  onClose,
  roles,
}: {
  onClose: (v: boolean) => void;
  roles?: IRoleModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateRoleDailogState();

  const form = useForm<z.infer<typeof roleAddUpdateFormSchema>>({
    resolver: zodResolver(roleAddUpdateFormSchema),
    defaultValues: {
      name: roles ? `${roles.name}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (values: z.infer<typeof roleAddUpdateFormSchema>) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_create_update_role({
      ...values,
      id: !roles ? 0 : roles.id,
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
