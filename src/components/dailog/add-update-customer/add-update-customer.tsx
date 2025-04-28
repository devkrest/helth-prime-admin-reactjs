import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddCustomerDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ICustomerModel } from "@/model/customer_model";

function AddUpdateCustomerDailog({
  onClose,
  customer,
}: {
  onClose: (v: boolean) => void;
  customer?: ICustomerModel;
}) {
  const ctrl = useAddCustomerDailogCtrl({ onClose,customer });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
    >
      <DialogTitle>{customer ? "Update" : "Add"} Customer</DialogTitle>

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
                      placeholder="Enter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="lead_id"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Lead ID</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter lead ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="carrier"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Carrier</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter carrier"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="state"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">State</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter state"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Phone Number</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter phone number"
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
              ) : customer ? (
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

export default AddUpdateCustomerDailog;
