// import { Get_User_List_Api } from "@/network/api-call/user";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance, isToday } from "date-fns";

import { api_policy_lead_get_all } from "@/network/apis/policy-lead-api";
import { IFollowUpLeadModel } from "@/model/follow_up_model";
import { cn } from "@/lib/utils";
import { IUserModel } from "@/model/user_model";
import { api_all_user_list } from "@/network/apis/user_api";
import { Link } from "react-router-dom";
import { useDebounce } from "@/components/ui/milti-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { DataTable } from "@/components/table/data-table";
import { Edit2, Loader } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { api_policy_lead_assign_to } from "@/network/apis/policy-lead-api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PolicyManagementPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, setAutoResetPageIndex] = useState(false);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search, 800);
  const [callStatus, setCallStatus] = useState("0");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [data, setData] = useState<IFollowUpLeadModel[]>([]);
  const [pickDate, setPickDate] = useState<Date | undefined>(undefined);
  const [user, setUser] = useState<IUserModel[]>([]);
  const [assignTo, setAssignTo] = useState(false);
  const [sUser, setSUser] = useState<string | undefined>(undefined);
  const [isAssign, setIsAssign] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IFollowUpLeadModel | null>(
    null
  );

  const getAllUser = async () => {
    const u = await api_all_user_list({ module_id: 14 });
    if (u && u.s && u.r) {
      setUser(u.r);
      setSelectedUserId(u.r[0].id + "");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const getData = async (
    skip: number,
    callS: string,
    userId: string | null,
    sDate: Date | undefined,
    searchV: string
  ) => {
    setIsLoading(true);
    const r = await api_policy_lead_get_all({
      search: searchV,
      skip: skip,
      call_status: callS,
      user_id: userId,
      selected_date: sDate ? format(sDate, "yyyy-MM-dd") : null,
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
    if (selectedUserId) {
      getData(0, callStatus, selectedUserId, pickDate, searchValue);
    }
  }, [searchValue, callStatus, selectedUserId, pickDate]);

  const handleAssignTo = (row: IFollowUpLeadModel) => {
    setSelectedRow(row);
    setAssignTo(true);
  };

  const handleAssign = async () => {
    if (!sUser || !selectedRow) {
      toast("Please select a user.");
      return;
    }
    setIsAssign(true);
    const res = await api_policy_lead_assign_to({
      follow_up_policy_lead_id: selectedRow.policy_lead_follow_up_id,
      user_id: sUser,
    });

    setIsAssign(false);

    if (res && res.s) {
      toast("Assigned successfully");
      getData(0, callStatus, selectedUserId, pickDate, search);
      setAssignTo(false);
      setSUser(undefined);
      setSelectedRow(null);
    } else {
      toast(res?.m ?? "Opps! something went wrong.");
    }
  };

  const columns: ColumnDef<IFollowUpLeadModel>[] = [
    {
      accessorKey: "name",
      header: "Lead Name",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start w-[180px]">
            <span className="font-medium">{`${row.original.lead_first_name} ${row.original.lead_last_name}`}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "lead_phone",
      header: "Phone Number",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start w-[120px]">
            <span className="font-medium">{`${row.original.lead_phone}`}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "scheduled_type_label",
      header: "Follow-Up Category",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start w-[150px]">
            <span className="font-medium">{`${getLabelName(
              row.original.scheduled_type_label
            )}`}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "flag_count",
      header: "Call Attempt Counter",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start">
            <span className="font-medium">{`${row.original.flag_count}`}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "last_attamp",
      header: "Last Call Attempt",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start w-[140px]">
            <span className="font-medium">{`${
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
      header: "Call Now",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start w-[100px]">
            <Link
              to={`https://chi.tldcrm.com/dialer/pop/${row.original.lead_id}`}
              target="_blank"
              className="text-white bg-green-700 rounded-md w-16 py-1 text-center hover:bg-green-800 transition-colors"
            >
              Call
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "call_status_label",
      header: "Call Status",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start w-[120px]">
            <span
              className={cn(
                "font-medium",
                row.original.call_status == 0 && "text-yellow-500",
                row.original.call_status == 1 && "text-blue-500",
                row.original.call_status == 2 && "text-green-500",
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
      header: "Scheduled At",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-y-1 items-start">
            <span className="font-medium">
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
      header: "Action",
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={row.original.call_status == 0}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 bg-blue-50 text-blue-600 hover:bg-blue-100",
                    row.original.call_status == 0 && "disabled:opacity-0"
                  )}
                  onClick={() => handleAssignTo(row.original)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Assign To</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];

  const CustomToolbarContent = () => (
    <div className="flex items-center gap-2">
      <Select value={callStatus} onValueChange={(v) => setCallStatus(v)}>
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Select a call status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Call Status</SelectLabel>
            <SelectItem value="0">Pending</SelectItem>
            <SelectItem value="1">Did Not Answer</SelectItem>
            <SelectItem value="2">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] h-9 pl-3 text-left font-normal",
              !pickDate && "text-muted-foreground"
            )}
          >
            {pickDate ? format(pickDate, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <Calendar
            mode="single"
            selected={pickDate}
            onSelect={setPickDate}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
          <PopoverClose
            onClick={() => setPickDate(undefined)}
            className={cn(
              "self-end text-end hover:bg-primary hover:opacity-90 m-1"
            )}
          >
            Clear
          </PopoverClose>
        </PopoverContent>
      </Popover>

      {user.length ? (
        <Select
          value={selectedUserId ?? undefined}
          onValueChange={(v) => setSelectedUserId(v)}
        >
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a user</SelectLabel>
              {user.map((v) => (
                <SelectItem key={v.id} value={`${v.id}`}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );

  return (
    <div className="pb-10">
      <Card className="flex flex-col mt-16 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black/80">
            Policy Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            search={search}
            searchValue={[search, callStatus, selectedUserId, pickDate]}
            onSearchChange={(e) => setSearch(e.target.value)}
            getData={(skip) =>
              getData(skip, callStatus, selectedUserId, pickDate, search)
            }
            callToNextPage={(index, size) => {
              const totalDataCount = size * (index + 1);
              if (totalDataCount >= data.length) {
                getData(
                  data.length,
                  callStatus,
                  selectedUserId,
                  pickDate,
                  search
                );
              }
            }}
            initialTableState={{
              columnPinning: {
                right: ["actions"],
              },
            }}
            toolbarContent={<CustomToolbarContent />}
          />
        </CardContent>
      </Card>

      <Dialog open={assignTo}>
        <DialogContent
          onInteractOutside={isAssign ? () => {} : () => setAssignTo(false)}
          onXClick={isAssign ? () => {} : () => setAssignTo(false)}
          className="sm:max-w-[425px] gap-4 p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Assign Lead</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select User
              </label>
              <Select value={sUser} onValueChange={(v) => setSUser(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a user to assign the lead" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Users</SelectLabel>
                    {user
                      .filter((v) => v.id + "" != selectedUserId)
                      .map((v, i) => (
                        <SelectItem key={i} value={`${v.id}`}>
                          {v.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <DialogClose asChild>
              <Button
                disabled={isAssign}
                onClick={() => {
                  setAssignTo(false);
                  setSUser(undefined);
                  setSelectedRow(null);
                }}
                type="button"
                variant="outline"
                className="h-9"
              >
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                disabled={isAssign}
                onClick={handleAssign}
                className="h-9"
              >
                {isAssign ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  "Assign"
                )}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PolicyManagementPage;

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
