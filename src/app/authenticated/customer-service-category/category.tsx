// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";

import ICustomerServiceCategoryModel from "@/model/customer_service_category_model";
import { api_category_list } from "@/network/apis/customer-service/category_api";

function CustomerServioceCategoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ICustomerServiceCategoryModel[]>([]);

  const getData = async (skip: number) => {
    setIsLoading(true);
    const r = await api_category_list({
      search: search,
      skip: skip,
    });
    if (r.s) {
      if (skip > 0) {
        setData((p) => [...p, ...(r.r ?? [])]);
      } else {
        setData(r.r ?? []);
      }
    }
    setAutoResetPageIndex(false);
    setIsLoading(false);
  };

  useEffect(() => {
    setAutoResetPageIndex(true);
    getData(0);
  }, [search]);

  const columns: ColumnDef<ICustomerServiceCategoryModel>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="ID"
          className="w-[35px]"
        />
      ),
      cell: ({ row }) => <div className="w-[35px]">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Title"
          className="w-[230px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[230px]">
            <div className="">
              <span className="">{`${row.getValue("title")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "script",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Script"
          className="w-[230px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[230px]">
            <div className="">
              <span className="">{`${row.getValue("script")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "tld_key",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="TLD Key"
          className="w-[230px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[230px]">
            <div className="">
              <span className="">{`${row.getValue("tld_key")}`}</span>
            </div>
          </div>
        );
      },
    },
 
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="w-32 justify-center flex"
          column={column}
          title="Created At"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center w-32">
            <span className="">
              {format(row.getValue("created_at"), "HH:mm, dd MMM yyyy")}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Action"
          className="flex justify-start pr-2"
        />
      ),
      cell: ({ row }) => (
        <DataTableRowActions getData={() => getData(0)} row={row} />
      ),
    },
  ];

  return (
    <div className="h-full w-full pt-20 px-4 ">
      <DataTable
        getData={getData}
        isLoading={isLoading}
        autoResetPageIndex={autoResetPageIndex}
        columns={columns}
        data={data}
        search={search}
        setSearch={setSearch}
        callToNextPage={(index) => {
          const totalDataCount = 30 * index;
          if (totalDataCount >= data.length) {
            getData(data.length);
          }
        }}
      />
    </div>
  );
}

export default CustomerServioceCategoryPage;
