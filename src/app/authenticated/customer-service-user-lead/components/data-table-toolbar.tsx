"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { api_customer_service_analitics } from "@/network/apis/customer-service/user_lead_api";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number) => void;
  dataS:any,
}

export function DataTableToolbar<TData>({
  table,
  search,
  setSearch,
  dataS
}: DataTableToolbarProps<TData> & Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [data, setData] = useState({
    total_cust: 0,
    total_assign_cust: 0,
    total_remaining_cust: 0,
  });

  const getDataS = async () => {
    const res = await api_customer_service_analitics({});

    if (res && res.s) {
      setData(
        res.r ?? {
          total_cust: 0,
          total_assign_cust: 0,
          total_remaining_cust: 0,
        }
      );
    }
  };

  useEffect(() => {
    getDataS();
  }, [dataS]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex justify-end items-center gap-x-2">
        <div className="bg-white p-2 px-3 rounded-xl gap-x-2 border flex items-center">
          <div>
            <p className="text-blue-500">Total Customer : {data.total_cust}</p>
          </div>
          <div>
            <p className="text-green-500">Total Assigned : {data.total_assign_cust}</p>
          </div>
          <div>
            <p className="text-orange-500">Total Remaining : {data.total_remaining_cust}</p>
          </div>
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
