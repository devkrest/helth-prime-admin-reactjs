// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { DataTableRowActions } from "./components/data-table-row-actions";
import { api_oep_eligibility_list } from "@/network/apis/oep-new/oep_manage_api";
import { IEligibilityModel } from "@/model/oep_new/oep_eligibility_model";

function OEPManagePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [selectedStatus, setSelectedValue] = useState("0");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IEligibilityModel[]>([]);

  const getData = async (skip: number) => {
    if (selectedStatus != "0") {
      setIsLoading(true);
      const r = await api_oep_eligibility_list({
        search: search,
        user_id: selectedStatus,
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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setAutoResetPageIndex(true);
    getData(0);
  }, [selectedStatus, search]);

  const columns: ColumnDef<IEligibilityModel>[] = [
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
      accessorKey: "license",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="License No."
          className="w-[120px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[120px]">
            <div className="">
              <span className="">{`${row.getValue("license")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "license_type_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="License Type"
          className="w-[120px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[120px]">
            <div className="">
              <span className="">{`${row.getValue("license_type_name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "aor_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="AOR Name"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <div className="">
              <span className="">{`${row.getValue("aor_name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "appointment_status_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Appointment Status"
          className="w-[150px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[150px]">
            <div className="">
              <span className="">{`${row.getValue(
                "appointment_status_name"
              )}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "carrier_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Carrier Name"
          className="w-[140px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[140px]">
            <div className="">
              <span className="">{`${row.getValue("carrier_name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "state_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="State"
          className="w-[140px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[140px]">
            <div className="">
              <span className="">{`${row.getValue("state_name")}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "is_aor_ok",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Is Aor Ok"
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <div className="">
              <span className="">{`${
                row.getValue("is_aor_ok") == 1 ? "Yes" : "No"
              }`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "is_black_list",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Is Black List"
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <div className="">
              <span className="">{`${
                row.getValue("is_black_list") == 1 ? "Yes" : "No"
              }`}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "is_click_able",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Is Clickable"
          className="w-[100px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-[0.10rem] items-start w-[100px]">
            <div className="">
              <span className="">{`${
                row.getValue("is_click_able") == 1 ? "Yes" : "No"
              }`}</span>
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
        <DataTableRowActions
          user_id={selectedStatus}
          getData={() => getData(0)}
          row={row}
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

export default OEPManagePage;
