import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateAorDailogState } from "./state";
import { toast } from "sonner";
import { api_oep_appointment_add_update } from "@/network/apis/oep-new/oep_appointment_api";
import { IAppointmentModel } from "@/model/oep_new/oep_appointment_model";

export const appointmentAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
});

export const useAddAppointmentDailogCtrl = ({
  onClose,
  appointment,
}: {
  onClose: (v: boolean) => void;
  appointment?: IAppointmentModel;
}) => {
  const { isLoading, setIsLoading } = useAddUpdateAorDailogState();

  const form = useForm<z.infer<typeof appointmentAddUpdateFormSchema>>({
    resolver: zodResolver(appointmentAddUpdateFormSchema),
    defaultValues: {
      name: appointment ? `${appointment.name}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof appointmentAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_oep_appointment_add_update({
      name: values.name,
      id: !appointment ? 0 : appointment.id,
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
