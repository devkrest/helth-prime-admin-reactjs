import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddModuleDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { IModuleModel } from "@/model/module_model";
import { Textarea } from "@/components/ui/textarea";

function AddUpdateModuleDailog({
  onClose,
  module,
}: {
  onClose: (v: boolean) => void;
  module?: IModuleModel;
}) {
  const ctrl = useAddModuleDailogCtrl({ onClose, module });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
      className="sm:max-w-[425px] gap-4"
    >
      <DialogTitle className="text-xl font-semibold tracking-tight">
        {module ? "Update Module" : "Add New Module"}
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
                <FormLabel className="text-sm font-medium">Module Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. User Management, Dashboard, Reports"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={ctrl.form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a brief description of the module's purpose and functionality"
                    className="min-h-[100px] resize-none"
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
              ) : module ? (
                "Update Module"
              ) : (
                "Create Module"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export default AddUpdateModuleDailog;
