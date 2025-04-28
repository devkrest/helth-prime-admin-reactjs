import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../../ui/dialog";
import { useAddLicenseDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { IAorNameModel } from "@/model/oep_new/aor_name_model";

function AddUpdateLicenseTypeDailog({
  onClose,
  license,
}: {
  onClose: (v: boolean) => void;
  license?: IAorNameModel;
}) {
  const ctrl = useAddLicenseDailogCtrl({ onClose, license });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
    >
      <DialogTitle>{license ? "Update" : "Add"} License Type</DialogTitle>
     
        <Form {...ctrl.form}>
          <div className="flex flex-col justify-start ">
            <form
              onSubmit={ctrl.form.handleSubmit(ctrl.onSubmit)}
              className="flex flex-col gap-y-3 w-full"
            >
              <FormField
                control={ctrl.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl className="">
                      <Input
                        className="self-stretch flex-1 "
                        placeholder="Enter name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <Button
                className="hover:bg-primary bg-primary rounded-sm shadow-xl px-12 max-w-32"
                type="submit"
              >
                {ctrl.isLoading ? (
                  <Loader className="animate-spin" />
                ) : license ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </div>
        </Form>
     
    </DialogContent>
  );
}

export default AddUpdateLicenseTypeDailog;
