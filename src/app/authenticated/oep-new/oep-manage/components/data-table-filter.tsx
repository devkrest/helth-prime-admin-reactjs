"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IUserModel } from "@/model/user_model";
import { api_all_user_list } from "@/network/apis/user_api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedStatus: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableFiltert({ selectedStatus, setSelectedValue }: Props) {
  const [user, setUser] = useState<IUserModel[]>([]);
  const [open, setOpen] = useState(false);

  const getData = async () => {
    const res = await api_all_user_list();

    if (res && res.s && res.r) {
      
      if (selectedStatus == "0") {
        setSelectedValue(`${res.r[0].id}`);
      }
      setUser(res.r);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedStatus
            ? user.find((framework) => "" + framework.id === selectedStatus)
                ?.name
            : "Select agent..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 z-[9999999999]">
        <Command>
          <CommandInput placeholder="Search agent..." className="h-9" />
          <CommandList>
            <CommandEmpty>No agent found.</CommandEmpty>
            <CommandGroup>
              {user.map((framework, i) => (
                <CommandItem
                  key={i}
                  value={`${framework.name}-${framework.id}`}
                  onSelect={() => {
                    setSelectedValue(`${framework.id}`);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      {framework.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedStatus === "" + framework.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground/60">
                      {framework.email}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" size="sm" className="ml-auto  h-8 lg:flex">
    //       <MixerHorizontalIcon className="mr-2 h-4 w-4 text-primary" />
    //       Filter
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-[150px]">
    //     <DropdownMenuLabel>Filter By Status</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     {user.map((v, i) => (
    //       <DropdownMenuCheckboxItem
    //         key={i}
    //         className="capitalize"
    //         checked={selectedStatus === `${v.id}`}
    //         onCheckedChange={(_) => setSelectedValue(`${v.id}`)}
    //       >
    //         {v.name}
    //       </DropdownMenuCheckboxItem>
    //     ))}

    //     {/* <DropdownMenuCheckboxItem
    //       className="capitalize"
    //       checked={selectedStatus === "Deleted"}
    //       onCheckedChange={(_) => setSelectedValue("Deleted")}
    //     >
    //       Deleted
    //     </DropdownMenuCheckboxItem> */}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
