import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { useAddUserDailogCtrl } from "./ctrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { IUserModel } from "@/model/user_model";

function AddUserDailog({
  onClose,
  user,
}: {
  onClose: (v: boolean) => void;
  user?: IUserModel;
}) {
  const ctrl = useAddUserDailogCtrl({ onClose, user });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
      className="max-w-3xl h-[80vh] flex flex-col"
    >
      <div className="flex-none border-b pb-4">
        <DialogTitle className="text-xl font-semibold tracking-tight">
          {user ? "Update User" : "Add New User"}
        </DialogTitle>
      </div>

      {ctrl.isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <Form {...ctrl.form}>
          <div className="flex-1 overflow-y-auto pr-2">
            <form
              onSubmit={ctrl.form.handleSubmit(ctrl.onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={ctrl.form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Full Name <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter user's full name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email Address <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter user's email address"
                          type="email"
                          className="h-10 focus-visible:ring-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={ctrl.form.control}
                  name="ref_user_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        TLD User ID{" "}
                        <span
                          onClick={() => {
                            window.open(
                              "https://chi.tldcrm.com/?message=Insufficient+privileges+to+view+this+resource.&message_title=Permissions+Error&message_type=danger",
                              "_blank"
                            );
                          }}
                          className="text-primary cursor-pointer hover:underline text-xs"
                        >
                          (Refer table)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter TLD user ID"
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
                  name="role_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">User Role <span className="text-destructive">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 focus-visible:ring-1">
                            <SelectValue placeholder="Select user role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {ctrl.roles.map((v) => (
                            <SelectItem 
                              key={v.id} 
                              value={v.id + ""}
                              className="cursor-pointer hover:bg-muted"
                            >
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={ctrl.form.control}
                  name="agency_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Agency <span className="text-destructive">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 focus-visible:ring-1">
                            <SelectValue placeholder="Select agency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {ctrl.agency.map((v) => (
                            <SelectItem 
                              key={v.id} 
                              value={v.id + ""}
                              className="cursor-pointer hover:bg-muted"
                            >
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={ctrl.form.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Department <span className="text-destructive">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 focus-visible:ring-1">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {ctrl.department.map((v) => (
                            <SelectItem 
                              key={v.id} 
                              value={v.id + ""}
                              className="cursor-pointer hover:bg-muted"
                            >
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={ctrl.form.control}
                  name="plan_tool_without_enforcement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5 border-2"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">Plan tool without enforcement</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={ctrl.form.control}
                  name="want_follow_up_lead"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5 border-2"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">Lead Distribution</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={ctrl.form.control}
                name="module_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Modules <span className="text-destructive">*</span></FormLabel>
                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-md">
                      {ctrl.modules.map((v) => (
                        <div key={v.id} className="flex items-center space-x-2">
                          <Checkbox
                            onCheckedChange={(_) => {
                              const m = field.value
                                ? field.value.split(",")
                                : [];
                              if (m.includes(v.id + "")) {
                                const f = m.filter((j) => j != v.id + "");
                                ctrl.form.setValue("module_ids", f.join(","));
                              } else {
                                m.push(v.id + "");
                                ctrl.form.setValue("module_ids", m.join(","));
                              }
                            }}
                            value={v.id}
                            checked={
                              field.value
                                ? field.value.split(",").includes(v.id + "")
                                : false
                            }
                            className="h-5 w-5 border-2"
                          />
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {v.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </div>

          <div className="flex-none border-t pt-4 mt-4">
            <Button
              className="w-full h-10"
              type="submit"
              disabled={ctrl.isCreateUserLoading}
            >
              {ctrl.isCreateUserLoading ? (
                <Loader className="animate-spin mr-2 h-4 w-4" />
              ) : user ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        </Form>
      )}
    </DialogContent>
  );
}

export default AddUserDailog;
