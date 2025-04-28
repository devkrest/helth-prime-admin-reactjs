// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IUserModel } from "@/model/user_model";
import { format } from "date-fns";
import { DataTable } from "@/components/table/data-table";
import { api_get_user_list } from "@/network/apis/user_api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Eye, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddUserDailog from "@/components/dailog/add-user/add_user";
import { useDebounce } from "@/hooks/use-debounce";

function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [data, setData] = useState<IUserModel[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserModel | undefined>(
    undefined
  );

  const getData = useCallback(async (skip: number) => {
    setIsLoading(true);
    const r = await api_get_user_list({
      search: debouncedSearch,
      skip: skip,
      role: 1,
      status: selectedStatus,
    });
    if (r.s) {
      if (skip > 0) {
        setData((p) => [...p, ...(r.r ?? [])]);
      } else {
        setData(r.r ?? []);
      }
    }
    setIsLoading(false);
  }, [debouncedSearch, selectedStatus]);

  useEffect(() => {
    getData(0);
  }, [getData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEditUser = (user: IUserModel) => {
    setSelectedUser(user);
    setIsAddUserOpen(true);
  };

  const handleDeleteUser = (user: IUserModel) => {
    setSelectedUser(user);
    setIsDeleteUserOpen(true);
  };

  const ToolbarContent = () => (
    <div className="flex items-center gap-2">
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="1">Active</SelectItem>
          <SelectItem value="2">Pending</SelectItem>
          <SelectItem value="-1">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="h-8 gap-2"
        onClick={() => {
          setSelectedUser(undefined);
          setIsAddUserOpen(true);
        }}
      >
        <Plus className="h-4 w-4" />
        Add User
      </Button>
    </div>
  );

  const columns: ColumnDef<IUserModel>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="w-[35px]">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="font-medium truncate max-w-[200px]">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate max-w-[250px]">{row.original.email}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "is_oep_added",
      header: "OEP Status",
      cell: ({ row }) => {
        return (
          <Badge
            variant={row.original.is_oep_added == 1 ? "default" : "secondary"}
          >
            {row.original.is_oep_added == 1 ? "Added" : "Not Added"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "agency",
      header: "Agency",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate max-w-[200px]">
              {row.original.agency.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "department_name",
      header: "Department",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate max-w-[200px]">
              {row.original.department_name ?? "-"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge
            variant={
              (row.getValue("status") as number) == 1
                ? "default"
                : (row.getValue("status") as number) == 2
                ? "secondary"
                : "destructive"
            }
          >
            {row.original.status_label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              {format(row.getValue("created_at"), "HH:mm, dd MMM yyyy")}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-blue-50 text-blue-600 hover:bg-blue-100"
                    onClick={() => handleEditUser(row.original)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit User</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-green-50 text-green-600 hover:bg-green-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100"
                    onClick={() => handleDeleteUser(row.original)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete User</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  return (
    <div className="h-full w-full pt-16 px-4">
      <div className="flex flex-col gap-4">
        <DataTable
          initialTableState={{
            columnPinning: {
              right: ["actions"],
            },
          }}
          columns={columns}
          data={data}
          isLoading={isLoading}
          search={search}
          onSearchChange={handleSearchChange}
          getData={getData}
          toolbarContent={<ToolbarContent />}
          callToNextPage={(index, page_size) => {
            const totalDataCount = page_size * (index + 1);
            if (totalDataCount >= data.length) {
              getData(data.length);
            }
          }}
        />
      </div>

      {/* Add/Edit User Dialog */}
      {isAddUserOpen && (
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <AddUserDailog onClose={setIsAddUserOpen} user={selectedUser} />
        </Dialog>
      )}

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              User: {selectedUser?.name}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteUserOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Add delete functionality here
                setIsDeleteUserOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserPage;
