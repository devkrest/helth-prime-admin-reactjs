"use client";
import * as React from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  InitialTableState,
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

import { DataTableToolbar } from "./data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CommonPagination from "./common-pagination";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

interface Props {
  callToNextPage?: (index: number, size: number) => void;
  autoResetPageIndex?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  getData?: (skip: number) => void;
  search?: string;
  onSearchChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  initialTableState?: InitialTableState | undefined;
  searchValue?: any[];
  enableSearchField?: boolean;
  enableViewFilter?: boolean;
  enableFilter?: boolean;
  onFilterClick?: () => void;
  toolbarContent?: React.ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  callToNextPage,
  isLoading,
  isFetching,
  search,
  onSearchChange,
  initialTableState,
  searchValue = [],
  enableSearchField = true,
  enableViewFilter = true,
  enableFilter = false,
  onFilterClick,
  toolbarContent,
}: DataTableProps<TData> & Props) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
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
    initialState: initialTableState,
    autoResetPageIndex: false,
  });

  React.useEffect(() => {
    table.setPageIndex(0);
  }, [...searchValue]);

  return (
    <div className="space-y-4 h-full flex flex-col w-full">
      <DataTableToolbar
        table={table}
        search={search}
        onSearchChange={onSearchChange}
        enableSearchField={enableSearchField}
        enableViewFilter={enableViewFilter}
        enableFilter={enableFilter}
        onFilterClick={onFilterClick}
        toolbarContent={toolbarContent}
      />

      <div className="rounded-md border overflow-hidden bg-card flex-1 flex flex-col min-h-0">
        <div className="transition-all">
          {isFetching && (
            <div className="w-full bg-muted/50 p-2 px-4 text-sm text-muted-foreground flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Searching...
            </div>
          )}
        </div>
        <div className="flex-1 overflow-auto">
          
           
              <Table>
                <TableHeader >
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{ ...getCommonPinningStyles(header.column) }}
                            className="bg-background"
                           
                          >
                            <div
                              className="flex items-center gap-x-1.5 font-medium"
                              role="button"
                              onClick={() => {
                                header.column.toggleSorting(
                                  header.column.getIsSorted() == "asc"
                                );
                              }}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}

                              {header.column.getCanSort() && (
                                <div className="flex flex-col -space-y-1">
                                  {header.column.getIsSorted() == "desc" && (
                                    <ChevronUp size={14} className="text-muted-foreground" />
                                  )}
                                  {header.column.getIsSorted() == "asc" && (
                                    <ChevronDown size={14} className="text-muted-foreground" />
                                  )}
                                  {header.column.getCanSort() &&
                                    header.column.getIsSorted() == false && (
                                      <ArrowUpDown size={14} className="text-muted-foreground" />
                                    )}
                                </div>
                              )}
                            </div>
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-32">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-sm text-muted-foreground">Loading...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                style={{ ...getCommonPinningStyles(cell.column) }}
                                className="bg-background opacity-100"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-32">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <span className="text-sm text-muted-foreground">No results found</span>
                              {search && (
                                <span className="text-xs text-muted-foreground">
                                  Try adjusting your search or filters
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
           
         
        </div>
      </div>
      <CommonPagination table={table} callToNextPage={callToNextPage} />
    </div>
  );
}

const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? ""
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
