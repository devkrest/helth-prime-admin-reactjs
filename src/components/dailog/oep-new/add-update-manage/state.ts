import { IAorNameModel } from "@/model/oep_new/aor_name_model";
import { IAppointmentModel } from "@/model/oep_new/oep_appointment_model";
import { ILicenseTypeModel } from "@/model/oep_new/oep_license_type_model";
import { create } from "zustand";

interface IAddUpdateManageTypeDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;

  aor: IAorNameModel[];
  setAor: (v: IAorNameModel[]) => void;

  appointment: IAppointmentModel[];
  setAppointment: (v: IAppointmentModel[]) => void;

  license: ILicenseTypeModel[];
  setLicense: (v: ILicenseTypeModel[]) => void;
}

export const useAddUpdateManageDailogState = create<IAddUpdateManageTypeDailog>(
  (set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),

    aor: [],
    setAor: (aor) => set((p) => ({ ...p, aor })),

    appointment: [],
    setAppointment: (appointment) => set((p) => ({ ...p, appointment })),
    
    license: [],
    setLicense: (license) => set((p) => ({ ...p, license })),
  })
);
