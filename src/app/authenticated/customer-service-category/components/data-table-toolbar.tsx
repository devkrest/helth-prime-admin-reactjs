"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  RefreshCcwIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddUpdateCustomerServiceCategoryDailog from "@/components/dailog/add-update-customer-service-category/add-update-customer-service-category";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number) => void;
}

export function DataTableToolbar<TData>({
  table,
  search,
  setSearch,
  getData,
}: DataTableToolbarProps<TData> & Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>


      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            variant="outline"
            className="h-8"
          >
            Add Category
          </Button>
        </DialogTrigger>
        {open && (
          <AddUpdateCustomerServiceCategoryDailog
            onClose={(v) => {
              setOpen(false);
              if (v) {
                getData(0);
              }
            }}
          />
        )}
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.location.reload()}
      >
        <RefreshCcwIcon />
      </Button>

     
    </div>
  );
}
