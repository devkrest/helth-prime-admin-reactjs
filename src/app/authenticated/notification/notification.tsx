import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api_notification_add } from "@/network/apis/notification_api";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import Ios from "@/assets/mocup/ios-mockup.png";
import Android from "@/assets/mocup/android-mockup.png";
import CozmoApp from "@/assets/logo/cozmo-app.png";
import CanisApp from "@/assets/logo/canis-app.png";
import TritonApp from "@/assets/logo/triton-app.png";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordInput } from "@/components/ui/password-input";

function NotificationPage() {
  const [data, setData] = useState({
    title: "",
    body: "",
    app: "cozmo",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const [password, setPassword] = useState("");

  const sendNotificationFun = async () => {
    setIsLoading(true);
    //console.log(data.app)
    try {
      if (data.app == "cozmo") {
        await axios.post(
          "https://api.cozmohealth.com/api/notify-gearz/send-notification",
          {
            title: data.title,
            body: data.body,
          }
        );
      } else if (data.app == "canis") {
        await axios.post(
          "https://api.canishealth.com/api/notify-gearz/send-notification",
          {
            title: data.title,
            body: data.body,
          }
        );
      
      } else if (data.app == "triton") {
        await axios.post(
          "https://api.tritonhealthins.com/api/notify-gearz/send-notification",
          {
            title: data.title,
            body: data.body,
          }
        );
      }

      await api_notification_add({
        title: data.title,
        body: data.body,
        type: data.app,
      });
    } catch (_) {}
    toast("Notification sent.");
    setIsLoading(false);

    setData({ app: "cozmo", body: "", title: "" });
  };

  return (
    <div className="p-8 mt-20  flex justify-center gap-8">
      <div className="w-96 space-y-5">
        <div>
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(v) => setData((p) => ({ ...p, title: v.target.value }))}
            className="w-full"
            placeholder="Notitifcation title..."
          />
        </div>
        <div>
          <Label>Content</Label>
          <Textarea
            value={data.body}
            onChange={(v) => setData((p) => ({ ...p, body: v.target.value }))}
            className="w-full min-h-[190px]"
            placeholder="Notitifcation content..."
          />
        </div>

        <Select
          value={data.app}
          onValueChange={(v) => setData((p) => ({ ...p, app: v }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an app" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>App</SelectLabel>
              <SelectItem value="cozmo">Cozmo</SelectItem>
              <SelectItem value="canis">Canis</SelectItem>
              <SelectItem value="triton">Triton</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          disabled={!data.app || !data.title || !data.body || isLoading}
          onClick={async () => {
            setPassword("");
            setOpenDailog(true);
          }}
          className="w-full hover:opacity-80 hover:bg-primary"
        >
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            "Send Notification"
          )}
        </Button>
      </div>
      <div className="gap-2 flex flex-col">
        <div className="flex flex-col items-center gap-y-2 relative">
          <p className="font-bold">Apple</p>
          <img src={Ios} className="w-[300px] border-b" />
          <div className="flex items-center gap-x-2 rounded-2xl absolute w-[85%] h-[60px] bg-black/5 bottom-10 p-2 px-[0.60rem]">
            <img
              src={CozmoApp}
              className={cn(
                "w-9 rounded-md hidden",
                data.app == "cozmo" && "block"
              )}
            />
            <img
              src={CanisApp}
              className={cn(
                "w-9 rounded-md hidden",
                data.app == "canis" && "block"
              )}
            />
            <img
              src={TritonApp}
              className={cn(
                "w-9 rounded-md hidden",
                data.app == "triton" && "block"
              )}
            />
            <div className="flex-1 flex flex-col items-start">
              <div className="flex justify-between items-start w-full">
                <div className="min-w-[80%] w-[80%]">
                  <p className=" line-clamp-1 text-black/75 text-sm font-semibold">
                    {data.title}
                  </p>
                </div>
                <p className="text-xs">now</p>
              </div>
              <p className="line-clamp-1 text-black/90 text-xs">{data.body}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-1 relative mt-1">
          <p className="font-bold">Android</p>
          <img src={Android} className="w-[300px] border-b" />

          <div className="flex flex-col  gap-x-2 rounded-2xl absolute w-[85%] h-[75px] bg-black/5 bottom-12 p-2 px-[0.70rem] justify-center pt-3">
            <div className="flex justify-start items-center gap-x-2">
              <img
                src={CozmoApp}
                className={cn(
                  "w-4 rounded-md hidden",
                  data.app == "cozmo" && "block"
                )}
              />
              <img
                src={CanisApp}
                className={cn(
                  "w-4 rounded-md hidden",
                  data.app == "canis" && "block"
                )}
              />
              <p className="text-xs">
                {data.app == "cozmo" ? "Cozmo" : (data.app == "canis" ? "Canis" : "Triton")} Health
              </p>
              <p className="text-xs">•</p>
              <p className="text-xs">now</p>
            </div>
            <div className="flex-1 flex flex-col items-start mt-1 gap-y-[0.05rem]">
              <div className="flex justify-between items-start w-full">
                <p className=" line-clamp-1 text-black/75 text-sm font-semibold">
                  {data.title}
                </p>
              </div>
              <p className="line-clamp-1 text-black/90 text-xs">{data.body}</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDailog}>
        <DialogContent
          onXClick={() => setOpenDailog(false)}
          onInteractOutside={() => setOpenDailog(false)}
        >
          <DialogHeader>
            <DialogTitle>Password</DialogTitle>
          </DialogHeader>
          <PasswordInput
            value={password}
            onChange={(v) => setPassword(v.target.value)}
            placeholder="Enter password to send notification."
          />
          <div className="flex justify-end">
            <Button
              variant={"ghost"}
              onClick={() => {
                if (!password) {
                  toast("Please enter password");
                } else if (password != "!!Cozmo!!") {
                  toast("Password is incorrect");
                } else {
                  setOpenDailog(false);
                  sendNotificationFun();
                }
              }}
            >
              Submit
            </Button>
            <Button onClick={() => setOpenDailog(false)} variant={"ghost"}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NotificationPage;
