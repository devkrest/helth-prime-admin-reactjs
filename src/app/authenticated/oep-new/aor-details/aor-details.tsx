// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { IAorNameModel } from "@/model/oep_new/aor_name_model";
import { api_oep_aor_name_list } from "@/network/apis/oep-new/oep_name_api";

function AorDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [selectedStatus, setSelectedValue] = useState("All");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IAorNameModel[]>([]);

  const getData = async (skip: number) => {
    setIsLoading(true);
    const r = await api_oep_aor_name_list({
      search: search,
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
  }, [selectedStatus, search]);

  const columns: ColumnDef<IAorNameModel>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
          className="w-[200px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[200px]">
            <div className="">
              <span className="">{`${row.getValue("name")}`}</span>
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
        selectedStatus={selectedStatus}
        setSelectedValue={setSelectedValue}
        search={search}
        setSearch={setSearch}
        callToNextPage={(_) => {
          // const totalDataCount = 15 * index;
          // if (totalDataCount >= data.length) {
          //   getData(data.length);
          // }
        }}
      />
    </div>
  );
}

export default AorDetailsPage;
