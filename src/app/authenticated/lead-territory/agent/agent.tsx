// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IUserModel } from "@/model/user_model";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { api_lead_agent_list } from "@/network/apis/lead-territory/agent_api";

function LeadAgentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IUserModel[]>([]);

  const getData = async (skip: number) => {
    setIsLoading(true);
    if (skip == 0) {
      setAutoResetPageIndex(true);
    }
    const r = await api_lead_agent_list({
      search: search,
      skip: skip,
      role: 1,
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
   // setAutoResetPageIndex(true);
    getData(0);
  }, [search]);

  const columns: ColumnDef<IUserModel>[] = [
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
      accessorKey: "number_of_customer_assigned",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Assigned"
          className="w-[85px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-center w-[85px] justify-center">
            <div className="">
              <span className="">{`${row.getValue(
                "number_of_customer_assigned"
              )}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "number_of_call_pending",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Pending"
          className="w-[85px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-center w-[85px] justify-center">
          
              <span className="">{`${row.getValue(
                "number_of_call_pending"
              )}`}</span>
           
          </div>
        );
      },
    },
    {
      accessorKey: "number_of_call_completed",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Completed"
          className="w-[95px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-center w-[95px] justify-center">
           
              <span className="">{`${row.getValue(
                "number_of_call_completed"
              )}`}</span>
           
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
          className="w-[160px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[160px]">
            <div className="">
              <span className="">{`${row.getValue("name")}`}</span>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "agency",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Agency Name"
          className="w-[135px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-start w-[135px]">
            <span className="break-all line-clamp-3 ">
              {row.original.agency.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "department_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Department Name"
          className="w-[185px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-start w-[185px]">
            <span className="break-all line-clamp-3 ">
              {row.original.department_name ?? "-"}
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

export default LeadAgentPage;
