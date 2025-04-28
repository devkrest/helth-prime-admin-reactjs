import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddDepartmentDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { IDepartmentModel } from "@/model/department_model";
import MultipleSelector from "@/components/ui/milti-selector";

function AddUpdateDepartmentDailog({
  onClose,
  department,
}: {
  onClose: (v: boolean) => void;
  department?: IDepartmentModel;
}) {
  const ctrl = useAddDepartmentDailogCtrl({ onClose, department });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
      className="sm:max-w-[425px] gap-4"
    >
      <DialogTitle className="text-xl font-semibold tracking-tight">
        {department ? "Update Department" : "Add New Department"}
      </DialogTitle>

      {ctrl.isFetching ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Form {...ctrl.form}>
          <form
            onSubmit={ctrl.form.handleSubmit(ctrl.onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={ctrl.form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Department Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Human Resources, Finance"
                      className="h-10 focus-visible:ring-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="short_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Abbreviation <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. HR, FIN"
                      className="h-10 focus-visible:ring-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Director of Department{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={ctrl.users as any}
                    placeholder={
                      field.value.length ? "" : "Select department director"
                    }
                    emptyIndicator={
                      <p className="text-center text-sm text-muted-foreground">
                        No results found
                      </p>
                    }
                    className="h-10"
                  />
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="h-10 px-6"
                disabled={ctrl.isLoading}
              >
                {ctrl.isLoading ? (
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                ) : department ? (
                  "Update Department"
                ) : (
                  "Create Department"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </DialogContent>
  );
}

export default AddUpdateDepartmentDailog;
