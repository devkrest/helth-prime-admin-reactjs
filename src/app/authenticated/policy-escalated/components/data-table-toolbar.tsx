"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcwIcon } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number, searchV:string) => void;
}

export function DataTableToolbar<TData>({
  search,
  setSearch,
}: DataTableToolbarProps<TData> & Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by (Policy ID, Lead ID, Cus. Name)"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 w-[150px] lg:w-[320px]"
        />
      </div>

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
