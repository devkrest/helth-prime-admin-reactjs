import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateDepartmentDailogState } from "./state";
import { toast } from "sonner";
import { IDepartmentModel } from "@/model/department_model";
import { useEffect } from "react";
import { api_all_user_list } from "@/network/apis/user_api";
import { api_create_department } from "@/network/apis/department_api";

export const departmentAddUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Name must be at least 1 characters.",
  }),
  short_name: z.string({ required_error: "Abbreviation is required." }).min(2, {
    message: "Abbreviation must be at least 1 characters.",
  }),
  user_id: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
      { required_error: "Please seleact a department head" }
    )
    .refine((v) => v.length,{message:"Please seleact a department head"}),
});

export const useAddDepartmentDailogCtrl = ({
  onClose,
  department,
}: {
  onClose: (v: boolean) => void;
  department?: IDepartmentModel;
}) => {
  const {
    isLoading,
    setIsLoading,
    users,
    setUsers,
    isFetching,
    setIsFetching,
  } = useAddUpdateDepartmentDailogState();

  const form = useForm<z.infer<typeof departmentAddUpdateFormSchema>>({
    resolver: zodResolver(departmentAddUpdateFormSchema),
    defaultValues: {
      name: department ? `${department.name}` : undefined,
      user_id: department ? department.user : [],
      short_name: department ? `${department.short_name}` : undefined,
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (
    values: z.infer<typeof departmentAddUpdateFormSchema>
  ) => {
    //console.log(values);
    setIsLoading(true);

    const res = await api_create_department({
      name:values.name,
      short_name:values.short_name,
      user_id:values.user_id.map((v)=>v.id).join(","),
      id: !department ? 0 : department.id,
    });

    if (res.s) {
      onClose(true);
    } else {
      toast(res?.m ?? "Opps! something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  const getUsers = async () => {
    setIsFetching(true);
    const res = await api_all_user_list();
    setUsers(res?.r ?? []);
    setIsFetching(false);
    return res.r;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    form,
    isLoading,
    onSubmit,
    users,
    isFetching,
  };
};
