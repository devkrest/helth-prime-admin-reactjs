import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo/health-prime.png";
import {
  // drawerMenuCustomerService,
  drawerMenuItems,
  // drawerMenuLead,
  // drawerMenuTools,
  drawerPolicyLead,
} from "./drawer-menu-items";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TWSideDrawerActiveAfterEffect,
  TWSideDrawerAfterEffect,
} from "@/lib/const-value";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ChevronRight, Circle } from "lucide-react";

function DrawerView({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex w-full h-full border-r border-muted flex-col bg-background/95 backdrop-blur-sm">
      <Header />
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <DrawerMenu setOpen={setOpen} />
      </ScrollArea>
    </div>
  );
}

export default DrawerView;

function Header() {
  return (
    <div className="border-b border-muted px-4 w-full h-16 flex gap-2 justify-start items-center">
      <div className="w-36">
        <img src={Logo} className="h-12 dark:inline-block" alt="Health Prime Logo" />
      </div>
    </div>
  );
}

function DrawerMenu({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderMenuSection = (title: string, items: any[], index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <p className="text-primary/80 font-semibold pl-6 py-3 text-xs uppercase tracking-wider flex items-center gap-2">
          <Circle className="h-2 w-2 text-primary/50" />
          {title}
        </p>
      </div>
      <div className="space-y-0.5">
        {items.map((v, i) => (
          <Button
            onClick={() => {
              setOpen(false);
              navigate(v.href);
            }}
            variant="ghost"
            className={cn(
              "relative hover:bg-accent/50 justify-start rounded-none py-3 gap-3 text-sm w-full group transition-all duration-200",
              TWSideDrawerAfterEffect,
              pathname === v.href && TWSideDrawerActiveAfterEffect,
              "hover:pl-1"
            )}
            key={i}
          >
            {v.icon && (
              <div className={cn(
                "p-2 rounded-sm transition-all duration-200",
                pathname === v.href 
                  ? "bg-primary/10 text-primary" 
                  : "bg-transparent text-muted-foreground group-hover:bg-accent/20 group-hover:text-foreground"
              )}>
                <v.icon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </div>
            )}
            <span className={cn(
              "font-medium transition-colors flex-1 text-left",
              pathname === v.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {v.title}
            </span>
            <ChevronRight 
              className={cn(
                "h-4 w-4 transition-all duration-200",
                pathname === v.href 
                  ? "text-primary translate-x-1" 
                  : "text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-foreground"
              )} 
            />
          </Button>
        ))}
      </div>
      <Separator className="my-3 opacity-50" />
    </motion.div>
  );

  return (
    <div className="flex-1 flex flex-col gap-1 overflow-hidden py-2">
      {renderMenuSection("System Management", drawerMenuItems, 0)}
      {renderMenuSection("Policy Management", drawerPolicyLead, 1)}
      {/* {renderMenuSection("Lead Management", drawerMenuLead, 2)}
      {renderMenuSection("Customer Service", drawerMenuCustomerService, 3)}
      {renderMenuSection("Tools & Utilities", drawerMenuTools, 4)} */}
    </div>
  );
}
