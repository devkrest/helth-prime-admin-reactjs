// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { api_customer_list } from "@/network/apis/customer_api";
import { ICustomerModel } from "@/model/customer_model";
import { cn } from "@/lib/utils";

function CustomerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ICustomerModel[]>([]);

  const getData = async (skip: number) => {
    setIsLoading(true);
    if (skip == 0) {
      setAutoResetPageIndex(true);
    }
    const r = await api_customer_list({
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
    //setAutoResetPageIndex(true);
    getData(0);
  }, [search]);

  const columns: ColumnDef<ICustomerModel>[] = [
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
      accessorKey: "lead_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Lead-ID"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("lead_id")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="State"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("state")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "carrier",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Carrier"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("carrier")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Phone"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("phone") ?? "-"}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "u_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Agent Name"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span
                className={cn(
                  "text-red-500",
                  row.original.u_name && "text-orange-500"
                )}
              >{`${row.getValue("u_name") ?? "Not Assigned"}`}</span>
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
        callToNextPage={(index,page_size) => {
          const totalDataCount = page_size * (index + 1);
          if (totalDataCount >= data.length) {
            getData(data.length);
          }
        }}
      />
    </div>
  );
}

export default CustomerPage;
