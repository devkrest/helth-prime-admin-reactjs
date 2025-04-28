"use client";
import { Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { Table } from "@tanstack/react-table";
import { ChangeEventHandler, ReactNode } from "react";

interface DataTableToolbarProps {
  table: Table<any>;
  search?: string;
  onSearchChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  enableSearchField?: boolean;
  enableViewFilter?: boolean;
  enableFilter?: boolean;
  onFilterClick?: () => void;
  toolbarContent?: ReactNode;
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  enableSearchField = true,
  enableViewFilter = false,
  enableFilter = false,
  onFilterClick,
  toolbarContent,
}: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   table.getColumn("title")?.setFilterValue(value);
  // };
  // const statusColumn = table.getColumn("status");
  // const priorityColumn = table.getColumn("priority");

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      {enableSearchField && (
        <div className="relative">
          <Input
            placeholder="Search"
            value={search}
            onChange={onSearchChange}
            className="h-8 w-[200px] pl-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      )}

      {/* {statusColumn && (
        <DataTableFacetedFilter
          column={statusColumn}
          title="Status"
          options={statuses}
        />
      )}
      {priorityColumn && (
        <DataTableFacetedFilter
          column={priorityColumn}
          title="Priority"
          options={priorities}
        />
      )} */}

      {toolbarContent}

      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}

      {enableViewFilter && <DataTableViewOptions table={table} />}
      {enableFilter && (
        <Button
          size="sm"
          variant={"outline"}
          color="dark"
          onClick={onFilterClick}
          className="ltr:ml-2 rtl:mr-2 h-8"
        >
          <div className="relative">
            <Filter className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
            <div className="h-2 w-2 bg-primary absolute -top-1 right-1 rounded-full"></div>
          </div>
          Filter
        </Button>
      )}
    </div>
  );
}
