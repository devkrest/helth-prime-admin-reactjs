// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IUserModel } from "@/model/user_model";
import { format } from "date-fns";
import { DataTable } from "@/components/table/data-table";
import {
  api_add_update_user_eligibility,
  api_create_user,
  api_get_user_list,
} from "@/network/apis/user_api";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Ban,
  CheckCheck,
  Import,
  Loader,
} from "lucide-react";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddUserDailog from "@/components/dailog/add-user/add_user";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import Papa from "papaparse";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ICsvData {
  carrier: string;
  license: string;
  license_type: string;
  carrier_id: string;
  state: string;
  aor: string;
  blacklist: number | string;
}

function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpload, setIsLoadingUpload] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [data, setData] = useState<IUserModel[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserModel | undefined>(
    undefined
  );
  const [openCsv, setOpenCsv] = useState(false);
  const [user, setUser] = useState<ICsvData[]>([]);

  const getData = useCallback(
    async (skip: number) => {
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
    },
    [debouncedSearch, selectedStatus]
  );

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
    setBlockOpen(true);
  };

  const handleSelectCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("come");
    if (e.target.files?.length) {
      const ext = e.target.files[0].name.split(".").pop();

      if (ext === "csv") {
        Papa.parse(e.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results: any) {
            //console.log(results.data[0]);
            const t: ICsvData[] = results.data as ICsvData[];

            let o = true;
            for (let v of t) {
              if (
                !v.carrier ||
                !v.carrier_id ||
                !v.license ||
                !v.license_type ||
                !v.state ||
                v.blacklist == null
              ) {
                toast("Some fields are missing.");
                o = false;
                break;
              }
            }

            setUser(t);

            setOpenCsv(o);
          },
        });

        return;
      }

      toast("File should be a csv format.");
    }
  };

  const importUser = async () => {
    setIsLoadingUpload(true);

    // for (let v of user) {
    //   const res = await api_create_update_customer(v);

    //   if (res.s) {
    //     toast("success");
    //   } else {
    //     //toast(res.m ?? "Opps! something went wrong. Please try again.");
    //   }
    // }

    const res = await api_add_update_user_eligibility({
      data: JSON.stringify(user),
      user_id: selectedUser?.id,
    });

    if (res.s) {
      toast("success");
    }

    setUser([]);
    setOpenCsv(false);
    setIsLoadingUpload(false);
    getData(0);
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
          <SelectItem value="Revoked">Revoked</SelectItem>
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
          <div className="w-24 flex justify-center">
            <Badge
              variant={row.original.is_oep_added == 1 ? "default" : "secondary"}
            >
              {row.original.is_oep_added == 1 ? "Added" : "Not Added"}
            </Badge>
          </div>
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
                  <label
                    htmlFor="file"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "cursor-pointer h-8 w-8 bg-orange-50 text-orange-600 hover:bg-orange-100"
                    )}
                  >
                    <Import className="h-4 w-4" />
                    <input
                      value=""
                      onChange={handleSelectCsv}
                      accept=".csv"
                      type="file"
                      id="file"
                      className="hidden"
                    />
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>OEP Xcell Import</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100",
                      row.original.status != 1 &&
                        "hover:bg-green-100 bg-green-50 text-green-600 "
                    )}
                    onClick={() => handleDeleteUser(row.original)}
                  >
                    {row.original.status == 1 ? (
                      <Ban className="h-4 w-4" />
                    ) : (
                      <CheckCheck className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {" "}
                    {row.original.status == 1 ? "Revoked User" : "Active User"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  return (
    <div className="pb-[20px]">
      <Card className="flex flex-col  mt-16  shadow-md">
        <CardHeader > 

          <CardTitle className="text-xl font-bold text-black/80">User Management</CardTitle>
        </CardHeader>
        
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      {isAddUserOpen && (
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <AddUserDailog onClose={setIsAddUserOpen} user={selectedUser} />
        </Dialog>
      )}

      {/* Revoked And Active User Dialog */}

      {!!selectedUser && blockOpen && (
        <Dialog open={blockOpen}>
          <DialogContent
            onInteractOutside={() => setBlockOpen(false)}
            onXClick={() => setBlockOpen(false)}
            className="gap-0 rounded-md w-72 sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
          >
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
                {selectedUser.status === 1 ? "Revoke !" : "Active !"}
              </DialogTitle>
              <DialogDescription className="text-start ">
                Are you sure, You want to{" "}
                {selectedUser.status === 1 ? "revoke" : "active"} this user ?
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-x-3 ">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    setBlockOpen(false);
                  }}
                  type="button"
                  variant="link"
                  className="p-2"
                >
                  No
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button
                  className="p-2 text-primary"
                  variant="link"
                  onClick={async () => {
                    setBlockOpen(false);
                    await api_create_user({
                      status: selectedUser.status === 1 ? "2" : "1",
                      id: selectedUser.id,
                    });
                    getData(0);
                  }}
                >
                  Yes
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {openCsv && (
        <Dialog open={openCsv}>
          <DialogContent
            className="w-96"
            onInteractOutside={() => {
              setOpenCsv(false);
            }}
            onXClick={() => {
              setOpenCsv(false);
            }}
          >
            <p className="text-lg font-bold">Import Data</p>
            <p>Are you sure, you want to import data.</p>

            <div className="flex justify-end gap-4">
              <DialogClose
                disabled={isLoadingUpload}
                onClick={() => {
                  importUser();
                }}
              >
                {isLoadingUpload ? (
                  <Loader className="animate-spin" />
                ) : (
                  <p className="text-green-500">Yes</p>
                )}
              </DialogClose>
              <DialogClose onClick={() => setOpenCsv(false)}>
                <p className="text-red-500">No</p>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default UserPage;
