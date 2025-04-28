import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddRoleDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { IRoleModel } from "@/model/role_model";

function AddUpdateRoleDailog({
  onClose,
  roles,
}: {
  onClose: (v: boolean) => void;
  roles?: IRoleModel;
}) {
  const ctrl = useAddRoleDailogCtrl({ onClose, roles });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
      className="sm:max-w-[425px] gap-4"
    >
      <DialogTitle className="text-xl font-semibold tracking-tight">
        {roles ? "Update Role" : "Add New Role"}
      </DialogTitle>

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
                <FormLabel className="text-sm font-medium">Role Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Administrator, Manager, Editor"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
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
                <Loader className="h-4 w-4 animate-spin" />
              ) : roles ? (
                "Update Role"
              ) : (
                "Create Role"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export default AddUpdateRoleDailog;
