import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddCategoryDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import ICustomerServiceCategoryModel from "@/model/customer_service_category_model";
import { Textarea } from "@/components/ui/textarea";

function AddUpdateCustomerServiceCategoryDailog({
  onClose,
  category,
}: {
  onClose: (v: boolean) => void;
  category?: ICustomerServiceCategoryModel;
}) {
  const ctrl = useAddCategoryDailogCtrl({ onClose, category });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
    >
      <DialogTitle>{category ? "Update" : "Add"} Category</DialogTitle>

      <Form {...ctrl.form}>
        <div className="flex flex-col justify-start ">
          <form
            onSubmit={ctrl.form.handleSubmit(ctrl.onSubmit)}
            className="flex flex-col gap-y-3 w-full"
          >
            <FormField
              control={ctrl.form.control}
              name="title"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Title</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="script"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Script</FormLabel>
                  <FormControl className="">
                    <Textarea
                      className="self-stretch flex-1 "
                      placeholder="Enter script"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="tld_key"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">TLD Key</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter TLD key"
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
              ) : category ? (
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

export default AddUpdateCustomerServiceCategoryDailog;
