import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateLicenseDailogState } from "./state";
import { toast } from "sonner";
import { IAorNameModel } from "@/model/oep_new/aor_name_model";
import { api_oep_license_type_add_update } from "@/network/apis/oep-new/oep_license_api";

export const licenseAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
});

export const useAddLicenseDailogCtrl = ({
  onClose,
  license,
}: {
  onClose: (v: boolean) => void;
  license?: IAorNameModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateLicenseDailogState();

  const form = useForm<z.infer<typeof licenseAddUpdateFormSchema>>({
    resolver: zodResolver(licenseAddUpdateFormSchema),
    defaultValues: {
      name: license ? `${license.name}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof licenseAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_oep_license_type_add_update({
      name: values.name,
      id: !license ? 0 : license.id,
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
