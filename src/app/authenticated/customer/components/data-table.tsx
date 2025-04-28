"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
interface Props {
 
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  callToNextPage: (index: number,page_size:number) => void;
  autoResetPageIndex: boolean;
  isLoading: boolean;
  getData: (skip: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  search,
  setSearch,
  callToNextPage,
  autoResetPageIndex,
  isLoading,
  getData,
}: DataTableProps<TData, TValue> & Props) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    autoResetPageIndex: false,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  React.useEffect(() => {
    if (autoResetPageIndex) {
      table.setPageIndex(0);
    }
  }, [autoResetPageIndex]);

  return (
    <div className="w-full  grid place-content-start ">
      <div className="mb-2">
        <DataTableToolbar
          getData={getData}
          search={search}
          setSearch={setSearch}
          table={table}
          
        />
      </div>

      <Table className="block  flex-1 h-[60vh] rounded-md relative">
        <TableHeader
          className={cn(
            " block rounded-md w-[calc(100vw-250px)] sticky top-0  ",
            !table.getRowModel().rows?.length && "block"
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="flex w-full  items-center"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="bg-gray-50 dark:bg-gray-900 items-center last:flex-1 flex last:justify-end border-b"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="rounded-md border-0  w-full flex flex-col">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="flex-1 flex "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="  last:flex-1 last:flex last:justify-end"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isLoading ? (
            <div>
              <Loader className="block w-full h-8 border-0 animate-spin" />
            </div>
          ) : (
            <TableRow className="block w-full border-0">
              <TableCell
                colSpan={columns.length}
                className=" w-[100vw] h-24 text-center border-0"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} callToNextPage={callToNextPage} />
    </div>
  );
}
