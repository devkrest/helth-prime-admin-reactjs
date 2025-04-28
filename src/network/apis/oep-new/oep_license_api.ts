import { ILicenseTypeModel } from "@/model/oep_new/oep_license_type_model";
import { URLs } from "../../apis.endpoints";
import { API_GET, API_POST } from "../../axios.services";

export const api_oep_license_type_list = async (data: any) => {
  const res = await API_GET<ILicenseTypeModel[]>({
    url: URLs.oepGetListLicenseTypeName,
    params: data,
  });

  return res;
};

export const api_oep_license_type_add_update = async (data: any) => {
  const res = await API_POST<null>({
    url: data.id ? URLs.oepUpdateLicenseTypeName : URLs.oepAddLicenseTypeName,
    data,
  });

  return res;
};
