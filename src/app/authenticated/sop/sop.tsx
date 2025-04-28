// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { ISopModel } from "@/model/sop_model";
import {
  api_department_user_sop,
  api_get_sop_list,
} from "@/network/apis/sop_api";
import { cn } from "@/lib/utils";

function SOPPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  // const [selectedStatus, setSelectedValue] = useState("All");
  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState("0");
  const [statusId, setStatusId] = useState("10");
  const [data, setData] = useState<ISopModel[]>([]);
  const [approval, setApproval] = useState<{ id: number; name: string }[]>([]);

  const getData = async (skip: number) => {
    setIsLoading(true);
    const r = await api_get_sop_list({
      search: search,
      ...(departmentId != "0" && { department_id: departmentId }),
      ...(statusId != "10" && { status: statusId }),
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

  const getApprovalData = async () => {
    const r = await api_department_user_sop({});
    if (r.s && r.r) {
      setApproval(r.r);
    }
  };

  useEffect(() => {
    setAutoResetPageIndex(true);
    getData(0);
  }, [ search, departmentId,statusId]);

  useEffect(() => {
    getApprovalData();
  }, []);

  const columns: ColumnDef<ISopModel>[] = [
    {
      accessorKey: "prepared_by_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Prepared By"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <span className="">{row.getValue("prepared_by_name")}</span>
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
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <span className="">{row.getValue("department_name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Title"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <span className="">{row.getValue("title")}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "sop_number",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="SOP Nu."
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <span className="">{row.getValue("sop_number")}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "version_number",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Version Nu."
          className="w-[80px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[80px]">
            <span className="">{row.getValue("version_number")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "supersedes",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Supersedes"
          className="w-[120px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[120px]">
            <span className="">{row.getValue("supersedes")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "approved_by_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Approved By"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <span className="">{row.getValue("approved_by_name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status_label",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <span
              className={cn(
                "font-semibold",

                row.original.status == 0 && "text-yellow-500",
                row.original.status == 1 && "text-green-500",
                row.original.status == 2 && "text-red-500"
              )}
            >
              {row.getValue("status_label") ?? "-"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Effective Date"
          className="w-[120px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[120px]">
            <span className="">
              {format(row.getValue("created_at"), "MM-dd-yyyy")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Last Update"
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <span className="">
              {format(row.getValue("updated_at"), "MM-dd-yyyy")}
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
          approval={approval}
          search={search}
          getData={getData}
          row={row}
        />
      ),
    },
  ];

  return (
    <div className="h-full w-full pt-20 px-4 ">
      <DataTable
        statusId={statusId}
        setStatustId={setStatusId}
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
        getData={getData}
        isLoading={isLoading}
        autoResetPageIndex={autoResetPageIndex}
        columns={columns}
        data={data}
      
        search={search}
        setSearch={setSearch}
        callToNextPage={(index) => {
          const totalDataCount = 15 * index;
          if (totalDataCount >= data.length) {
            getData(data.length);
          }
        }}
      />
    </div>
  );
}

export default SOPPage;
