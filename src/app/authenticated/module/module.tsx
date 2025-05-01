// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState, useCallback } from "react";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IModuleModel } from "@/model/module_model";
import { api_module_list } from "@/network/apis/module_api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import AddUpdateModuleDailog from "@/components/dailog/add-update-module/add-update-module";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ModulePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [data, setData] = useState<IModuleModel[]>([]);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<
    IModuleModel | undefined
  >(undefined);

  const getData = useCallback(
    async (skip: number) => {
      setIsFetching(true);
      try {
        const response = await api_module_list({
          skip,
          take: 10,
          search: debouncedSearch,
          status: selectedStatus === "All" ? undefined : selectedStatus,
        });
        if (response.s) {
          setData(response.r ?? []);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setIsFetching(false);
        setIsLoading(false);
      }
    },
    [debouncedSearch, selectedStatus]
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

  const handleEditModule = (module: IModuleModel) => {
    setSelectedModule(module);
    setIsAddModuleOpen(true);
  };

  const ToolbarContent = () => (
    <div className="flex items-center gap-2">
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Blocked">Blocked</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="h-8 gap-2"
        onClick={() => {
          setSelectedModule(undefined);
          setIsAddModuleOpen(true);
        }}
      >
        <Plus className="h-4 w-4" />
        Add Module
      </Button>
    </div>
  );

  const columns: ColumnDef<IModuleModel>[] = [
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
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="truncate max-w-[250px]">
            {row.original.description}
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
          {row.original.status === 1 ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) =>
        format(new Date(row.original.created_at), "MMM dd, yyyy"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 bg-blue-50 hover:bg-blue-100"
            onClick={() => handleEditModule(row.original)}
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="pb-10">
      <Card className="flex flex-col  mt-16  shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black/80">
            Module Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<IModuleModel>
            columns={columns}
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            onSearchChange={handleSearchChange}
            getData={getData}
            search={search}
            searchValue={[search, selectedStatus]}
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

          {isAddModuleOpen && (
            <Dialog open={isAddModuleOpen}>
              <AddUpdateModuleDailog
                module={selectedModule}
                onClose={(v) => {
                  setIsAddModuleOpen(false);
                  setSelectedModule(undefined);
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

export default ModulePage;
