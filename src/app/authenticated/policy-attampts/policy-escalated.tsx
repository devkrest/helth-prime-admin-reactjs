// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance, isToday } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { api_policy_lead_get_all } from "@/network/apis/policy-lead-api";
import { IFollowUpLeadModel } from "@/model/follow_up_model";
import { cn } from "@/lib/utils";
import { IUserModel } from "@/model/user_model";
import { api_all_user_list } from "@/network/apis/user_api";
import { Link } from "react-router-dom";
import { useDebounce } from "@/components/ui/milti-selector";

function PolicyAttamptsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search, 800);
  const [data, setData] = useState<IFollowUpLeadModel[]>([]);
  const [user, setUser] = useState<IUserModel[]>([]);

  const getAllUser = async () => {
    const u = await api_all_user_list({ module_id: 14 });

    if (u && u.s && u.r) {
      setUser(u.r);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  const getData = async (skip: number, searchV: string) => {
    setIsLoading(true);
    const r = await api_policy_lead_get_all({
      search: searchV,
      skip: skip,
      call_status: "0",
      is_flag_count:"1"
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

    getData(0, searchValue);
  }, [searchValue]);

  const columns: ColumnDef<IFollowUpLeadModel>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Lead Name"
          className="w-[180px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[180px]">
            <span className="">{`${row.original.lead_first_name} ${row.original.lead_last_name}`}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "lead_phone",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Phone Number"
          className="w-[120px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[120px]">
            <span className="">{`${row.original.lead_phone}`}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "scheduled_type_label",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Follow-Up Category"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <span className="">{`${getLabelName(
              row.original.scheduled_type_label
            )}`}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "flag_count",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Call Attempt Counter"
          className="w-[160px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[160px]">
            <span className="">{`${row.original.flag_count}`}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "last_attamp",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Last Call Attempt"
          className="w-[140px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[140px]">
            <span className="">{`${
              !row.original?.last_attamp
                ? "Not call yet"
                : formatDistance(
                    row.original?.last_attamp?.created_at ?? Date.now(),
                    Date.now(),
                    { addSuffix: true }
                  )
            }`}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "link",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Call Now"
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <Link
              to={`https://chi.tldcrm.com/dialer/pop/${row.original.lead_id}`}
              target="_blank"
              className="text-white bg-green-700 rounded-md w-16 py-1 text-center"
            >
              Call
            </Link>
          </div>
        );
      },
    },

    {
      accessorKey: "call_status_label",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Call Status"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <span
              className={cn(
                row.original.call_status == 0 && "text-yellow-500",
                row.original.call_status == 1 && "text-blue-500",
                row.original.call_status == 2 && "text-green-500",
                row.original.call_status == 3 && "text-red-500",
                row.original.call_status == 0 &&
                  +row.original.flag_count >= 3 &&
                  "text-red-500"
              )}
            >{`${row.original.call_status_label}`}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "scheduled_date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Scheduled At"
          className="w-[200px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[200px]">
            <span className="">
              {isToday(row.getValue("scheduled_date"))
                ? "Today"
                : format(row.getValue("scheduled_date"), "PPP")}
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
        <DataTableRowActions
          user={user}
          getData={getData}
          row={row}
          search={search}
          
        />
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
        callToNextPage={(index, size) => {
          const totalDataCount = size * (index + 1);
          if (totalDataCount >= data.length) {
            getData(data.length, search);
          }
        }}
      />
    </div>
  );
}

export default PolicyAttamptsPage;

function getLabelName(label: string) {
  switch (label) {
    case "24h":
      return "24-hour call";
    case "30d":
      return "30-day call";
    case "60d":
      return "60-day call";
    case "90d":
      return "90-day call";
    default:
      return "Not Call Yet";
  }
}
