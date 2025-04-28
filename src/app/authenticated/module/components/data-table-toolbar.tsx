"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFiltert } from "./data-table-filter";
import { RefreshCcwIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddUpdateModuleDailog from "@/components/dailog/add-update-module/add-update-module";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
  selectedStatus: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number) => void;
}

export function DataTableToolbar<TData>({
  table,
  selectedStatus,
  setSelectedValue,
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
          placeholder="Filter by name..."
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
      <DataTableFiltert
        selectedStatus={selectedStatus}
        setSelectedValue={setSelectedValue}
      />
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            variant="outline"
            className="h-8"
          >
            Add Module
          </Button>
        </DialogTrigger>
        {open && (
          <AddUpdateModuleDailog
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
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
