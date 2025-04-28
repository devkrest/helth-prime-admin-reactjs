import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";
import { IAppointmentModel } from "@/model/oep_new/oep_appointment_model";

export const api_oep_appointment_list = async (data: any) => {
  const res = await API_GET<IAppointmentModel[]>({
    url: URLs.oepGetListAppointmentName,
    params: data,
  });

  return res;
};

export const api_oep_appointment_add_update = async (data: any) => {
  const res = await API_POST<null>({
    url: data.id ? URLs.oepUpdateAppointmentName : URLs.oepAddAppointmentName,
    data,
  });

  return res;
};
