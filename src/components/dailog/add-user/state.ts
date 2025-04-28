import { IAgencyModel } from "@/model/agency_model";
import { IDepartmentModel } from "@/model/department_model";
import { IModuleModel } from "@/model/module_model";
import { IRoleModel } from "@/model/role_model";
import { create } from "zustand";

interface IAddUserDailog {
  isCreateUserLoading: boolean;
  roles: IRoleModel[];
  department: IDepartmentModel[];
  agency: IAgencyModel[];
  modules: IModuleModel[];
  isLoading: boolean;
  setRole: (v: IRoleModel[]) => void;
  setAgency: (v: IAgencyModel[]) => void;
  setDepartment: (v: IDepartmentModel[]) => void;
  setModules: (v: IModuleModel[]) => void;
  setIsLoading: (v: boolean) => void;
  setIsCreateUserLoading: (v: boolean) => void;
}

export const useAddUserDailogState = create<IAddUserDailog>((set) => ({
  agency: [],
  isLoading: true,
  modules: [],
  roles: [],
  department: [],
  isCreateUserLoading: false,

  setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
  setAgency: (agency) => set((p) => ({ ...p, agency })),
  setRole: (roles) => set((p) => ({ ...p, roles })),
  setModules: (modules) => set((p) => ({ ...p, modules })),
  setDepartment: (department) => set((p) => ({ ...p, department })),
  setIsCreateUserLoading: (isCreateUserLoading) =>
    set((p) => ({ ...p, isCreateUserLoading })),
}));
