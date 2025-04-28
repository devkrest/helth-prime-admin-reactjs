import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import Profile from "./components/Profile";
import { cn } from "@/lib/utils";
import { TWBlurEffect } from "@/lib/const-value";
import { motion } from "framer-motion";

function HeaderView({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        `z-50 fixed top-0 left-0 md:left-[200px] right-0 border-b border-muted h-16 flex justify-between items-center px-4 md:px-6`,
        TWBlurEffect,
        "bg-background/95 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center">
        <Button
          className="h-8 w-8 md:hidden p-0"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Profile />
      </div>
    </motion.header>
  );
}

export default HeaderView;
