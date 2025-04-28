"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableFiltert } from "./data-table-filter";
import { api_all_department_list } from "@/network/apis/department_api";
import { useEffect, useState } from "react";
import { IDepartmentModel } from "@/model/department_model";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
 
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  departmentId: string;
  setDepartmentId: React.Dispatch<React.SetStateAction<string>>;
  statusId: string;
  setStatustId: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number) => void;
}

export function DataTableToolbar<TData>({
  table,
  // selectedStatus,
  // setSelectedValue,
  search,
  setSearch,
  departmentId,
  statusId,
  setDepartmentId,
  setStatustId,
}: // getData,
DataTableToolbarProps<TData> & Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [department, setDepartment] = useState<IDepartmentModel[]>([]);

  const getDepartment = async () => {
    const res = await api_all_department_list();
    setDepartment(res.r ?? []);
    return res.r;
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <div>
          <Label>Search</Label>
          <Input
            placeholder="Filter by title and name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-[150px] lg:w-[250px]"
          />
        </div>
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
      {/* <DataTableFiltert
        selectedStatus={selectedStatus}
        setSelectedValue={setSelectedValue}
      /> */}

      <div>
        <Label>Status</Label>
        <Select value={statusId} onValueChange={(v) => setStatustId(v)}>
          <SelectTrigger className="h-10 w-72">
            {" "}
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">All</SelectItem>

              <SelectItem value={"0"}>In Review</SelectItem>
              <SelectItem value={"1"}>Approved</SelectItem>
              <SelectItem value={"2"}>Denied</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {department.length ? (
        <div>
          <Label>Department</Label>
          <Select
            value={departmentId}
            onValueChange={(v) => setDepartmentId(v)}
          >
            <SelectTrigger className="h-10 w-72">
              {" "}
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key={"0"} value="0">
                  All
                </SelectItem>
                {department.map((v) => {
                  return (
                    <SelectItem key={v.id} value={v.id + ""}>
                      {v.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : null}

      
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
