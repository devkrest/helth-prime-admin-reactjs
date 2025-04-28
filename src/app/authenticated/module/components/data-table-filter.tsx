"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Props {
  selectedStatus: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableFiltert({ selectedStatus, setSelectedValue }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto  h-8 lg:flex">
          <MixerHorizontalIcon className="mr-2 h-4 w-4 text-primary" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Filter By Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="capitalize"
          checked={selectedStatus === "All"}
          onCheckedChange={(_) => setSelectedValue("All")}
        >
          All
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="capitalize"
          checked={selectedStatus === "Active"}
          onCheckedChange={(_) => setSelectedValue("Active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="capitalize"
          checked={selectedStatus === "Blocked"}
          onCheckedChange={(_) => setSelectedValue("Blocked")}
        >
          Blocked
        </DropdownMenuCheckboxItem>
        {/* <DropdownMenuCheckboxItem
          className="capitalize"
          checked={selectedStatus === "Deleted"}
          onCheckedChange={(_) => setSelectedValue("Deleted")}
        >
          Deleted
        </DropdownMenuCheckboxItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
