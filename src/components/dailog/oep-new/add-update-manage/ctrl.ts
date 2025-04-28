import { useForm } from "react-hook-form";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateManageDailogState } from "./state";
import { api_oep_license_type_list } from "@/network/apis/oep-new/oep_license_api";
import { IEligibilityModel } from "@/model/oep_new/oep_eligibility_model";
import { useEffect } from "react";
import { api_oep_aor_name_list } from "@/network/apis/oep-new/oep_name_api";
import { api_oep_appointment_list } from "@/network/apis/oep-new/oep_appointment_api";
import { api_oep_eligibility_add_update } from "@/network/apis/oep-new/oep_manage_api";
import { toast } from "sonner";
import { carriers_with_tld_id, states } from "@/lib/const-value";

export const manageAddUpdateFormSchema = z.object({
  license: z.string({ required_error: "License is required." }).min(2, {
    message: "License must be at least 1 characters.",
  }),
  license_type_id: z.string({ required_error: "License type is required." }),
  is_aor_ok: z.string({ required_error: "Is AOR is required." }),
  aor_id: z.string({ required_error: "AOR is required." }),
  appointment_id: z.string({ required_error: "Appointment is required." }),
  state: z.string({ required_error: "State is required." }),
  carrier_name: z.string({ required_error: "Carrier name is required." }),
  is_click_able: z.string({ required_error: "Click able is required." }),
  is_black_list: z.string({ required_error: "Black list is required." }),
});

export const useAddManageDailogCtrl = ({
  manage,
  onClose,
  user_id,
}: {
  onClose: (v: boolean) => void;
  manage?: IEligibilityModel;
  user_id: string;
}) => {
  const ctrl = useAddUpdateManageDailogState();

  const form = useForm<z.infer<typeof manageAddUpdateFormSchema>>({
    resolver: zodResolver(manageAddUpdateFormSchema),
    defaultValues: {
      license: manage ? `${manage.license}` : undefined,
      license_type_id: manage ? `${manage.license_type_id}` : undefined,
      aor_id: manage ? `${manage.aor_id}` : undefined,
      appointment_id: manage ? `${manage.appointment_id}` : undefined,
      carrier_name: manage ? `${manage.carrier_name}` : undefined,
      is_aor_ok: manage ? `${manage.is_aor_ok}` : undefined,
      is_black_list: manage ? `${manage.is_black_list}` : undefined,
      is_click_able: manage ? `${manage.is_click_able}` : undefined,
      state: manage ? `${manage.state}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const getData = async () => {
    await Promise.all([getAor(), getAppointment(), getLicense()]);
  };

  const getAor = async () => {
    const aor = await api_oep_aor_name_list({});
    if (aor && aor.s && aor.r) {
      ctrl.setAor(aor.r);
    }
  };

  const getAppointment = async () => {
    const appointment = await api_oep_appointment_list({});
    if (appointment && appointment.s && appointment.r) {
      ctrl.setAppointment(appointment.r);
    }
  };

  const getLicense = async () => {
    const license = await api_oep_license_type_list({});
    if (license && license.s && license.r) {
      ctrl.setLicense(license.r);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (
    values: z.infer<typeof manageAddUpdateFormSchema>
  ) => {
    //console.log(values);
    ctrl.setIsLoading(true);

    let key = `${values.carrier_name}`;
    if (values.carrier_name == "BCBS") {
      key = `${values.carrier_name}_${values.state}`;
    }
    const state_name = Object.entries(states).find(([_, value]) => value === values.state)?.[0];
   
    const carrier_id =
      carriers_with_tld_id[key as keyof typeof carriers_with_tld_id];

      if(!carrier_id && values.carrier_name == "BCBS"){
        toast("BCBS carrier not available in this state");
        ctrl.setIsLoading(false);
        return;
      }
    const res = await api_oep_eligibility_add_update({
      license: values.license,
      license_type_id: values.license_type_id,
      appointment_id: values.appointment_id,
      aor_id: values.aor_id,
      carrier_name: values.carrier_name,
      is_aor_ok: values.is_aor_ok,
      is_click_able: values.is_click_able,
      state: values.state,
      carrier_id,
      id: !manage ? 0 : manage.id,
      user_id,
      is_black_list: values.is_black_list,
      state_name
    });

    if (res.s) {
      onClose(true);
    } else {
      toast(res?.m ?? "Opps! something went wrong. Please try again.");
    }

    ctrl.setIsLoading(false);
  };

  return {
    form,
    onSubmit,
    ...ctrl,
  };
};
