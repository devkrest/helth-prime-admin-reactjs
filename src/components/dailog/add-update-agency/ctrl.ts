import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateAgencyDailogState } from "./state";
import { toast } from "sonner";
import { IAgencyModel } from "@/model/agency_model";
import { api_create_update_agecny } from "@/network/apis/agency_api";

export const agencyAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
  api_key: z.string({ required_error: "Api Key is required." }),
  api_id: z.string({ required_error: "Api Id is required." }),
});

export const useAddAgencyDailogCtrl = ({
  onClose,
  agency,
}: {
  onClose: (v: boolean) => void;
  agency?: IAgencyModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateAgencyDailogState();

  const form = useForm<z.infer<typeof agencyAddUpdateFormSchema>>({
    resolver: zodResolver(agencyAddUpdateFormSchema),
    defaultValues: {
      name: agency ? `${agency.name}` : undefined,
      api_key: agency ? `${agency.api_key}` : undefined,
      api_id: agency ? `${agency.api_id}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof agencyAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_create_update_agecny({
      ...values,
      id: !agency ? 0 : agency.id,
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
