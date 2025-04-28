import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateAorDailogState } from "./state";
import { toast } from "sonner";
import { api_oep_aor_name_add_update } from "@/network/apis/oep-new/oep_name_api";
import { IAorNameModel } from "@/model/oep_new/aor_name_model";

export const aorAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
});

export const useAddAorDailogCtrl = ({
  onClose,
  aor,
}: {
  onClose: (v: boolean) => void;
  aor?: IAorNameModel;
}) => {
  const {
    isLoading,
    setIsLoading,
  } = useAddUpdateAorDailogState();

  const form = useForm<z.infer<typeof aorAddUpdateFormSchema>>({
    resolver: zodResolver(aorAddUpdateFormSchema),
    defaultValues: {
      name: aor ? `${aor.name}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof aorAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_oep_aor_name_add_update({
      name:values.name,
      id: !aor ? 0 : aor.id,
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
