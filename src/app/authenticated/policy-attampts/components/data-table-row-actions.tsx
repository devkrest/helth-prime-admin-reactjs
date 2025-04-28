"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IFollowUpLeadModel } from "@/model/follow_up_model";
import { IUserModel } from "@/model/user_model";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { api_policy_lead_assign_to } from "@/network/apis/policy-lead-api";
// import { useNavigate } from "react-router-dom";
// import { Update_User_Api } from "@/network/api-call/user";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (
    skip: number,
    searchV: string
  ) => void;
  user: IUserModel[];
  search: string;
}

export function DataTableRowActions({
  row,
  getData,
  user,
  search,
}: DataTableRowActionsProps<IFollowUpLeadModel>) {
  const [assignTo, setAssignTo] = useState(false);
  const [sUser, setSUser] = useState<string | undefined>(undefined);
  const [isAssign, setIsAssign] = useState<boolean>(false);
  // const navigate = useNavigate();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={row.original.status == -1}
            variant="ghost"
            className={cn(
              "flex h-8 w-8 p-0  data-[state=open]:bg-muted mr-2 justify-start",
              row.original.status == -1 && "disabled:opacity-0"
            )}
          >
            <DotsHorizontalIcon className="h-4 w-4 mx-auto" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={async () => {
              setAssignTo(true);
            }}
            className="gap-2 items-center"
          >
            <Edit2 size={15} />
            Assign To
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={assignTo}>
        <DialogContent
          onInteractOutside={isAssign ? () => {} : () => setAssignTo(false)}
          onXClick={isAssign ? () => {} : () => setAssignTo(false)}
          className="gap-0 rounded-md w-96 sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
        >
          <DialogHeader>
            <DialogTitle className="self-start tracking-wide">
              Assign Lead
            </DialogTitle>
          </DialogHeader>

          <Select value={sUser} onValueChange={(v) => setSUser(v)}>
            <SelectTrigger className="w-[250px] my-3">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a user</SelectLabel>
                {user
                  .filter((v) => v.id  != row.original.user_id)
                  .map((v, i) => (
                    <SelectItem key={i} value={`${v.id}`}>
                      {v.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-x-3 ">
            <DialogClose asChild>
              <Button
                disabled={isAssign}
                onClick={() => {
                  setAssignTo(false);
                }}
                type="button"
                variant="link"
                className="p-2 text-red-500"
              >
                Close
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                disabled={isAssign}
                className="p-2 text-primary"
                variant="link"
                onClick={async () => {
                  if (!sUser) {
                    toast("Please select a user.");
                    return;
                  }
                  setIsAssign(true);
                  const res = await api_policy_lead_assign_to({
                    follow_up_policy_lead_id:
                      row.original.policy_lead_follow_up_id,
                    user_id: sUser,
                  });

                  setIsAssign(false);

                  if (res && res.s) {
                    toast("Assigned successfully");
                    getData(0, search);
                  } else {
                    toast(res?.m ?? "Opps! something went wrong.");
                  }
                }}
              >
                {isAssign ? <Loader className="animate-spin" /> : "Assign"}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
