import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUserDailogState } from "./state";
import { api_role_list } from "@/network/apis/role_api";
import { api_agecny_list } from "@/network/apis/agency_api";
import { api_module_list } from "@/network/apis/module_api";
import { useEffect } from "react";
import { api_create_user } from "@/network/apis/user_api";
import { toast } from "sonner";
import { IUserModel } from "@/model/user_model";
import { api_all_department_list } from "@/network/apis/department_api";

export const userAddFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Email should be valid." }),
  role_id: z.string({ required_error: "Role is required." }),
  ref_user_id: z.string({ required_error: "Role is required." }).optional(),
  agency_id: z.string({ required_error: "Agency is required." }),
  module_ids: z
    .string({ required_error: "Module is required." })
    // .refine((v) => v.length, "Module is required.")
    .optional(),

  department_id: z.string({ required_error: "Department is required." }),
  plan_tool_without_enforcement: z
    .boolean({ required_error: "Plan tool without enforcement is required." })
    .default(true)
    .optional(),
  want_follow_up_lead: z
    .boolean({ required_error: "Plan tool without enforcement is required." })
    .default(false)
    .optional(),
});

export const useAddUserDailogCtrl = ({
  onClose,
  user,
}: {
  onClose: (v: boolean) => void;
  user?: IUserModel;
}) => {
  const {
    agency,
    isLoading,
    modules,
    roles,
    isCreateUserLoading,
    setIsCreateUserLoading,
    setAgency,
    setIsLoading,
    setModules,
    setRole,
    setDepartment,
    department,
  } = useAddUserDailogState();

  const form = useForm<z.infer<typeof userAddFormSchema>>({
    resolver: zodResolver(userAddFormSchema),
    defaultValues: {
      agency_id: user && user.agency_id ? `${user.agency_id}` : undefined,
      department_id:
        user && user.department_id ? `${user.department_id}` : undefined,
      role_id: user && user.role_id ? `${user.role_id}` : undefined,
      email: user ? `${user.email}` : undefined,
      name: user ? `${user.name}` : undefined,
      ref_user_id: user ? `${user.ref_user_id ?? ""}` : undefined,
      module_ids: user
        ? user.modules.map((v) => v.module_id).join(",")
        : undefined,
      plan_tool_without_enforcement: user
        ? !!user.plan_tool_without_enforcement
        : true,
      want_follow_up_lead: user ? !!user.want_follow_up_lead : false,
    },
    //  shouldUnregister: false,
  });

  const getRoles = async () => {
    const res = await api_role_list({});
    setRole(res.r ?? []);
    return res.r;
  };
  const getDepartment = async () => {
    const res = await api_all_department_list();
    setDepartment(res.r ?? []);
    return res.r;
  };

  const getAgency = async () => {
    const res = await api_agecny_list({});
    setAgency(res.r ?? []);
    return res.r;
  };
  const getModules = async () => {
    const res = await api_module_list({});
    setModules(res.r ?? []);
    return res.r;
  };

  const getData = async () => {
    setIsLoading(true);
    await getRoles();
    await getAgency();
    await getModules();
    await getDepartment();
    setIsLoading(false);
  };

  const onSubmit = async (values: z.infer<typeof userAddFormSchema>) => {
    //console.log(values);
    setIsCreateUserLoading(true);

    const res = await api_create_user({
      ...values,
      id: !user ? 0 : user.id,
      plan_tool_without_enforcement: values.plan_tool_without_enforcement
        ? 1
        : 0,
      want_follow_up_lead: values.want_follow_up_lead ? 1 : 0,
      module_ids: values?.module_ids?.length ? values.module_ids : "0",
    });

    if (res.s) {
      onClose(true);
    } else {
      toast(res?.m ?? "Opps! something went wrong. Please try again.");
    }

    setIsCreateUserLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    form,
    roles,
    modules,
    agency,
    isCreateUserLoading,
    isLoading,
    onSubmit,
    department,
  };
};
