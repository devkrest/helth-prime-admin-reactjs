// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { api_customer_service_list } from "@/network/apis/customer-service/customer_api";
import ICustomerServiceCustomerModel from "@/model/customer_service_customer_model";
import { cn } from "@/lib/utils";

function CustomerServioceCustomerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ICustomerServiceCustomerModel[]>([]);

  const getData = async (skip: number) => {
    if (skip == 0) {
      setAutoResetPageIndex(true);
    }
    setIsLoading(true);
    const r = await api_customer_service_list({
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

  const columns: ColumnDef<ICustomerServiceCustomerModel>[] = [
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
      accessorKey: "category_title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Category Title"
          className="w-[180px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[180px]">
            <div className="">
              <span className="">{`${
                row.getValue("category_title") ?? "-"
              }`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "lead_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Lead ID"
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
      accessorKey: "first_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="First Name"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("first_name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Last Name"
          className="w-[130px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[130px]">
            <div className="">
              <span className="">{`${row.getValue("last_name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Email"
          className="w-[280px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[280px]">
            <div className="">
              <span className="">{`${row.getValue("email")}`}</span>
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
              <span className="">{`${row.getValue("phone")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "agent_name",
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
                  row.original.agent_name && "text-orange-500"
                )}
              >{`${row.getValue("agent_name") ?? "Not Assigned"}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "tld_status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="TLD Status"
          className="w-[230px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[230px]">
            <div className="">
              <span className="">{`${row.getValue("tld_status")}`}</span>
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
        callToNextPage={(index, page_size) => {
          // console.log(page_size * (index + 1), data.length, index + 1);
          const totalDataCount = page_size * (index + 1);
          if (totalDataCount >= data.length) {
            getData(data.length);
          }
        }}
      />
    </div>
  );
}

export default CustomerServioceCustomerPage;
