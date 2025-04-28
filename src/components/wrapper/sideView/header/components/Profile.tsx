import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LocalStorageUserStore } from "@/lib/const-value";
import { useEffect, useState } from "react";
import { IUserModel } from "@/model/user_model";
import { api_get_user_details } from "@/network/apis/user_api";
import { motion } from "framer-motion";

function Profile() {
  return (
    <Popover>
      <PopoverTrigger className="data-[state=open]:ring-2 data-[state=open]:ring-primary/20 data-[state=open]:border-primary border-2 p-[0.12rem] border-muted-foreground/30 rounded-full transition-all duration-200">
        <Avatar className="h-8 w-8 ring-2 ring-background">
          <AvatarImage />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">A</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <ProfileContent />
    </Popover>
  );
}

export default Profile;

function ProfileContent() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const user = localStorage.getItem(LocalStorageUserStore)!;
    setUser(JSON.parse(user));
  }, []);

  const getData = async () => {
    const user = localStorage.getItem(LocalStorageUserStore)!;
    const u: IUserModel = JSON.parse(user);
    const res = await api_get_user_details({ id: u.id });

    if (res.s && res.r) {
      const data = {
        ...u,
        name: res.r.name,
        email: res.r.email,
      };
      localStorage.setItem(LocalStorageUserStore, JSON.stringify(data));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PopoverContent
      align="end"
      className={cn("w-64 p-0 grid z-[100000000000] relative overflow-hidden")}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="p-4 space-y-1"
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </motion.div>

      <Separator className="my-1" />

      <DrawerLogout />
    </PopoverContent>
  );
}

function DrawerLogout() {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "flex items-center gap-2 w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 rounded-none font-medium text-sm"
        )}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </DialogTrigger>
      <DialogContent className="sm:max-w-md gap-0 rounded-lg p-4">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-50">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold">Logout</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to logout from your account?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="px-4">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="px-4"
              onClick={() => {
                localStorage.removeItem(LocalStorageUserStore);
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
