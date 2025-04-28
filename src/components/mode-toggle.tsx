import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { TWBlurEffect } from "@/lib/const-value";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 relative rounded-full border border-muted-foreground/20 hover:bg-accent/50"
        >
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === "dark" ? 90 : 0,
              scale: theme === "dark" ? 0 : 1,
              opacity: theme === "dark" ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Sun className="h-4 w-4" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === "dark" ? 0 : -90,
              scale: theme === "dark" ? 1 : 0,
              opacity: theme === "dark" ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Moon className="h-4 w-4" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={cn(TWBlurEffect, "w-40 p-2")}
      >
        <DropdownMenuItem 
          onClick={() => setTheme({ theme: "light" })}
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5",
            theme === "light" && "bg-accent"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme({ theme: "dark" })}
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5",
            theme === "dark" && "bg-accent"
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme({ theme: "system" })}
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5",
            theme === "system" && "bg-accent"
          )}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
