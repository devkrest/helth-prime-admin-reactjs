// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState, useCallback } from "react";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";

import { useDebounce } from "@/hooks/use-debounce";
import { IDepartmentModel } from "@/model/department_model";
import { api_get_department_list } from "@/network/apis/department_api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog } from "@/components/ui/dialog";
import AddUpdateDepartmentDailog from "@/components/dailog/add-update-department/add-update-department";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DepartmentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [data, setData] = useState<IDepartmentModel[]>([]);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<
    IDepartmentModel | undefined
  >(undefined);

  const getData = useCallback(
    async (skip: number) => {
      setIsFetching(true);
      try {
        const response = await api_get_department_list({
          skip,
          take: 10,
          search: debouncedSearch,
        });
        if (response.s) {
          setData(response.r ?? []);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setIsFetching(false);
        setIsLoading(false);
      }
    },
    [debouncedSearch]
  );

  useEffect(() => {
    getData(0);
  }, [getData]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const value = typeof e === "string" ? e : e.target.value;
    setSearch(value);
  };

  const handleEditDepartment = (department: IDepartmentModel) => {
    setSelectedDepartment(department);
    setIsAddDepartmentOpen(true);
  };

  const ToolbarContent = () => (
    <div className="flex items-center gap-2">
      <Button
        className="h-8 gap-2"
        onClick={() => {
          setSelectedDepartment(undefined);
          setIsAddDepartmentOpen(true);
        }}
      >
        <Plus className="h-4 w-4" />
        Add Department
      </Button>
    </div>
  );

  const columns: ColumnDef<IDepartmentModel>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="font-medium truncate max-w-[200px]">
            {row.getValue("name")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "short_name",
      header: "Abbreviation",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="font-medium truncate max-w-[130px]">
            {row.getValue("short_name")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "Head of Department",
      cell: ({ row }) => {
        const names = row.original.user.map((v) => v.name);
        return (
          <div className="flex items-center">
            <span className="font-medium truncate max-w-[210px]">
              {names.join(", ")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "dir_user_name",
      header: "Director",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="font-medium truncate max-w-[210px]">
            {row.getValue("dir_user_name")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === 1 ? "default" : "destructive"}
          className="capitalize"
        >
          {row.original.status_label}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",

      cell: ({ row }) => (
        <p className="w-32">
          {format(new Date(row.original.created_at), "MMM dd, yyyy")}
        </p>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 bg-blue-50 hover:bg-blue-100"
                  onClick={() => handleEditDepartment(row.original)}
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Department</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  return (
    <div className=" pb-10">
      <Card className="flex flex-col  mt-16  shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black/80">
            Department Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<IDepartmentModel>
            initialTableState={{
              columnPinning: {
                right: ["actions"],
              },
            }}
            columns={columns}
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            onSearchChange={handleSearchChange}
            getData={getData}
            search={search}
            searchValue={[search]}
            enableSearchField={true}
            enableViewFilter={true}
            toolbarContent={<ToolbarContent />}
            callToNextPage={(index, page_size) => {
              const totalDataCount = page_size * (index + 1);
              if (totalDataCount > data.length) {
                getData(index);
              }
            }}
          />

          {isAddDepartmentOpen && (
            <Dialog open={isAddDepartmentOpen}>
              <AddUpdateDepartmentDailog
                department={selectedDepartment}
                onClose={(v) => {
                  setIsAddDepartmentOpen(false);
                  setSelectedDepartment(undefined);
                  if (v) getData(0);
                }}
              />
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DepartmentPage;
