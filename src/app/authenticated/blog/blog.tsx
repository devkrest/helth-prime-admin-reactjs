import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useBlogCtrl } from "./ctrl";
import { Calendar, Edit, Loader, Trash2 } from "lucide-react";
import { URLs } from "@/network/apis.endpoints";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { api_create_blog } from "@/network/apis/blog_api";
import { toast } from "sonner";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

function BlogPage() {
  const navigator = useNavigate();
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ctrl = useBlogCtrl();
  return (
    <div className="flex flex-col gap-2 items-start h-full p-10 pt-20  w-full">
      <Button
        className="self-end"
        variant="outline"
        onClick={() => navigator("/blog/create")}
      >
        Create Blog
      </Button>
      <div>
        <InfiniteScroll
          height={"78vh"}
          next={() => ctrl.getBlogList({ skip: ctrl.blog.length })}
          hasMore={true}
          loader={
            <div />
            // <div className="grid place-content-center">
            //   <Loader className="animate-spin" />
            // </div>
          }
          dataLength={ctrl.blog.length ?? 0}
          // className="flex gap-8 gap-x-10 mt-10"
          className="flex-1"
        >
          {/* <ScrollArea className="h-[80vh]"> */}
          <div className="grid grid-cols-3 gap-4">
            {ctrl.blog.map((v) => {
              return (
                <div className="relative border border-input/45 rounded-sm flex flex-col">
                  <LazyLoadImage
                    threshold={100}
                    wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: { transitionDelay: "1000s" },
                    }}
                    src={URLs.baseURL + "uploads/blog/" + v.cover_photo}
                    className="h-56 w-full object-cover rounded-t-sm"
                  />
                  <div className="mt-2 bg-primary rounded-full px-2 py-[2px] ml-2 self-start">
                    <p className="text-xs text-white">
                      {v.category ?? "Article"}
                    </p>
                  </div>
                  <div className="px-2 mt-1 flex-1">
                    <p className="text-primary line-clamp-2">{v.title}</p>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {v.description}
                    </p>
                  </div>
                  <Separator className="bg-muted-foreground/10 h-[0.5px] mt-3 mb-1" />
                  <div className=" flex justify-between items-center p-2">
                    <div className="flex gap-x-1 items-center">
                      <Calendar
                        size={16}
                        className="text-muted-foreground/80"
                      />{" "}
                      <p className="text-sm text-muted-foreground/80">
                        {format(v.display_date, "MM-dd-yyyy")}
                      </p>
                    </div>
                    <p
                      className={cn(
                        " bg-primary p-1 rounded-full text-xs text-white px-3",
                        v.status == 0 && "bg-yellow-500"
                      )}
                    >
                      {v.status_label}
                    </p>
                  </div>

                  <Button
                    onClick={() => navigator(`update/${v.id}`)}
                    className="absolute p-0 w-10 right-0 top-0 rounded-none rounded-tr-md rounded-bl-md  hover:bg-primary hover:opacity-80"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    onClick={() => setOpenDelete(v.id)}
                    className="absolute p-0 w-10 left-0 top-0 rounded-none rounded-tl-md rounded-br-md bg-red-500  hover:bg-red-500 hover:opacity-80"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              );
            })}
          </div>
          {/* </ScrollArea> */}
        </InfiniteScroll>
      </div>
      <Dialog open={!!openDelete}>
        <DialogContent
          className="w-96"
          onInteractOutside={() => setOpenDelete(null)}
          onXClick={() => setOpenDelete(null)}
        >
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure, You want to delete this blog ?
          </DialogDescription>
          <div className="flex justify-end">
            <Button
              onClick={async () => {
                setIsLoading(true);
                const f = new FormData();
                f.append("status", "-1");
                f.append("id", openDelete + "");

                const d = await api_create_blog(f);
                if (d.s) {
                  toast("Deleted successfully");
                  ctrl.getBlogList({ skip: 0 });
                }
                setIsLoading(false);
                setOpenDelete(null);
              }}
              variant={"ghost"}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Yes"}
            </Button>
            <Button onClick={() => setOpenDelete(null)} variant={"ghost"}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BlogPage;
