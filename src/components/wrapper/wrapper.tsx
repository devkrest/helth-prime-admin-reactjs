import MainView from "./sideView/MainView";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  TWBlurEffect,
  // TWSideDrawerWidth
} from "@/lib/const-value";
import { cn } from "@/lib/utils";
import DrawerView from "./drawer/drawer-view";
import { motion } from "framer-motion";

function Wrapper() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: -200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-0 h-full w-[250px] z-30"
      >
        <DrawerView setOpen={setOpen} />
      </motion.div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className={cn(
            "p-0 h-full w-[250px] border-none",
            TWBlurEffect,
            "bg-background/95 backdrop-blur-sm"
          )}
          onOverlayClick={() => setOpen(false)}
        >
          <DrawerView setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      {/* <MainView setOpen={setOpen} /> */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out w-full",
          "md:pl-[250px]"
        )}
      >
        <MainView setOpen={setOpen} />
      </motion.div>
    </div>
  );
}

export default Wrapper;
