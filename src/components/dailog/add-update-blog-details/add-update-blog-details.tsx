import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader, Upload } from "lucide-react";
import { useAddBlogDailogCtrl } from "./ctrl";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TagInput } from "emblor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IBlogModel } from "@/model/blog_model";
import { baseURL } from "@/network/apis.endpoints";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

function AddUpdateBlogDetailsDailog({
  onClose,
  blog,
  htmlContent,
}: {
  onClose: (v: boolean) => void;
  blog?: IBlogModel;
  htmlContent: string;
}) {
  const ctrl = useAddBlogDailogCtrl({ onClose, blog, htmlContent });
  return (
    <DialogContent
      onXClick={() => onClose(false)}
      onInteractOutside={() => onClose(false)}
    >
      <DialogTitle>{blog ? "Update" : "Create"} Blog</DialogTitle>
      {ctrl.isFetching ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <Form {...ctrl.form}>
          <ScrollArea className="flex flex-col justify-start max-h-[85vh]">
            <form
              onSubmit={ctrl.form.handleSubmit(ctrl.onSubmit)}
              className="flex flex-col gap-y-3 w-full px-2"
            >
              <FormField
                control={ctrl.form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">
                      Cover Photo{" "}
                      <span className="text-sm text-primary font-normal">
                        (SEO Cover Photo)
                      </span>
                    </FormLabel>

                    <FormControl className="h-36 w-72 border rounded-sm mt-0">
                      <label
                        id="upload"
                        className="border-red-500 border cursor-pointer   flex justify-center items-center flex-col"
                      >
                        <div
                          className={cn(
                            " w-full h-full flex justify-center items-center flex-col",
                            (field.value || blog?.cover_photo) && "hidden"
                          )}
                        >
                          <Upload />
                          <p>Click to upload</p>
                          <p className="text-sm text-muted-foreground/70">
                            JPG JPEG PNG WEBP
                          </p>
                        </div>
                        {field.value && (
                          <img
                            className="h-full w-full object-cover"
                            src={URL.createObjectURL(field.value)}
                          />
                        )}
                        {blog?.cover_photo && !field.value && (
                          <img
                            className="h-full w-full object-cover"
                            src={`${baseURL}uploads/blog/${blog.cover_photo}`}
                          />
                        )}
                        <input
                          onChange={(v) => {
                            if (v && v.target.files?.length) {
                              const file = v.target.files[0];
                              const ext = v.target.files[0].name
                                .split(".")
                                ?.pop();
                              // console.log(ext);
                              if (
                                ["png", "jpeg", "jpg", "webp"].includes(
                                  ext?.toLowerCase() ?? ""
                                )
                              ) {
                                field.onChange(file);
                              } else {
                                toast("Please select file format PNG JPG JPEG");
                              }
                            }
                          }}
                          type="file"
                          className="hidden"
                          id="upload"
                        />
                      </label>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">
                      Title{" "}
                      <span className="text-sm text-primary font-normal">
                        (SEO Title)
                      </span>
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        className="self-stretch flex-1 "
                        placeholder="Enter title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">
                      Description{" "}
                      <span className="text-sm text-primary font-normal">
                        (SEO Description)
                      </span>
                    </FormLabel>
                    <FormControl className="">
                      <Textarea
                        className="self-stretch flex-1 "
                        placeholder="Enter description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">
                      Alt{" "}
                      <span className="text-sm text-primary font-normal">
                        (SEO Alt)
                      </span>
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        className="self-stretch flex-1 "
                        placeholder="Enter alt..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="display_date"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">
                      Display Date{" "}
                      <span className="text-sm text-primary font-normal">
                        (Manage ordering of the blog)
                      </span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date:any) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">Category</FormLabel>
                    <FormControl className="">
                      <Input
                        className="self-stretch flex-1 "
                        placeholder="Enter category..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="create_by"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">Create By </FormLabel>
                    <FormControl className="">
                      <Select
                        value={field.value}
                        onValueChange={(v) => field.onChange(v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select create by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {ctrl.users.map((v) => {
                              return (
                                <SelectItem value={v.id + ""} key={v.id}>
                                  {v.name}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">Blog Status </FormLabel>
                    <FormControl className="">
                      <Select
                        value={field.value}
                        onValueChange={(v) => field.onChange(v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blog status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">Draft</SelectItem>
                            <SelectItem value="1">Live</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ctrl.form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className="font-bold">
                      Keywords{" "}
                      <span className="text-sm text-primary font-normal">
                        (SEO Keywords)
                      </span>
                    </FormLabel>
                    <FormControl className="">
                      <TagInput
                        {...field}
                        activeTagIndex={0}
                        setActiveTagIndex={() => {}}
                        placeholder="Enter a kewords"
                        tags={field.value}
                        setTags={(newTags) => {
                          field.onChange(newTags);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={ctrl.isLoading}
                className="hover:bg-primary bg-primary rounded-sm shadow-xl px-12 max-w-32"
                type="submit"
              >
                {ctrl.isLoading ? (
                  <Loader className="animate-spin" />
                ) : blog ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </ScrollArea>
        </Form>
      )}
    </DialogContent>
  );
}

export default AddUpdateBlogDetailsDailog;
