import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useAddManageDailogCtrl } from "./ctrl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { carriers, states } from "@/lib/const-value";
import { IEligibilityModel } from "@/model/oep_new/oep_eligibility_model";
import { ScrollArea } from "@/components/ui/scroll-area";

function AddUpdateManageDailog({
  onClose,
  manage,
  user_id,
}: {
  onClose: (v: boolean) => void;
  manage?: IEligibilityModel;
  user_id: string;
}) {
  const ctrl = useAddManageDailogCtrl({ onClose, manage, user_id });

  console.log(ctrl.form.formState.errors);
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
    >
      <DialogTitle>{manage ? "Update" : "Add"} EOP</DialogTitle>

      <Form {...ctrl.form}>
        <ScrollArea className="flex flex-col justify-start h-[80vh]">
          <form
            onSubmit={ctrl.form.handleSubmit(ctrl.onSubmit)}
            className="flex flex-col gap-y-3 w-full"
          >
            <FormField
              control={ctrl.form.control}
              name="license"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">License</FormLabel>
                  <FormControl className="">
                    <Input
                      className="self-stretch flex-1 "
                      placeholder="Enter license..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="license_type_id"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">License Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a license type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ctrl.license.map((v, i) => {
                        return (
                          <SelectItem key={i} value={`${v.id}`}>
                            {v.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(states).map((v, i) => {
                        return (
                          <SelectItem
                            key={i}
                            value={states[v as keyof typeof states]}
                          >
                            {v}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="carrier_name"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Carrier Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {carriers.map((v, i) => {
                        return (
                          <SelectItem key={i} value={v}>
                            {v}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="aor_id"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">AOR</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a aor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ctrl.aor.map((v, i) => {
                        return (
                          <SelectItem key={i} value={`${v.id}`}>
                            {v.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="appointment_id"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">
                    Appointment Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a appointment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ctrl.appointment.map((v, i) => {
                        return (
                          <SelectItem key={i} value={`${v.id}`}>
                            {v.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="is_aor_ok"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Is AOR ok</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a aor ok" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>Yes</SelectItem>
                      <SelectItem value={"0"}>No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ctrl.form.control}
              name="is_black_list"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Is black list</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a black list" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>Yes</SelectItem>
                      <SelectItem value={"0"}>No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={ctrl.form.control}
              name="is_click_able"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="font-bold">Is clickable</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a clickable" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>Yes</SelectItem>
                      <SelectItem value={"0"}>No</SelectItem>
                    </SelectContent>
                  </Select>
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
              ) : manage ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </ScrollArea>
      </Form>
    </DialogContent>
  );
}

export default AddUpdateManageDailog;
