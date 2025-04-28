import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddAgencyDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { IAgencyModel } from "@/model/agency_model";

function AddUpdateAgencyDailog({
  onClose,
  agency,
}: {
  onClose: (v: boolean) => void;
  agency?: IAgencyModel;
}) {
  const ctrl = useAddAgencyDailogCtrl({ onClose, agency });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
      className="sm:max-w-[425px] gap-4"
    >
      <DialogTitle className="text-xl font-semibold tracking-tight">
        {agency ? "Update Agency" : "Add New Agency"}
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
                <FormLabel className="text-sm font-medium">Agency Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. HealthCare Agency, Insurance Provider"
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
            name="api_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">API Key <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your unique API key"
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
            name="api_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">API ID <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your API identifier"
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
              ) : agency ? (
                "Update Agency"
              ) : (
                "Create Agency"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export default AddUpdateAgencyDailog;
