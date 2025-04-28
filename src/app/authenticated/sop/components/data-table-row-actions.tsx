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
import { cn } from "@/lib/utils";
import { ISopModel } from "@/model/sop_model";
import { useNavigate } from "react-router-dom";
import { api_update_sop } from "@/network/apis/sop_api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (skip: number) => void;
  search: string;
  approval: {
    id: number;
    name: string;
  }[];
}

export function DataTableRowActions({
  row,
  getData,
  approval,
}: DataTableRowActionsProps<ISopModel>) {
  const navigate = useNavigate();
  const [isDeny, setIsDeny] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [approvalUserId, setApprovalUserId] = useState("6");

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
            onClick={() => navigate(`${row.original.id}`)}
            className="gap-2 items-center"
          >
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={async () => {
              setApprovalUserId("6");
              setIsApprove(true);
            }}
            className={cn(
              "hidden gap-2 items-center",
              row.original.status == 0 && "block"
            )}
          >
            Approve
          </DropdownMenuItem>

          <DropdownMenuItem
            className={cn(
              "hidden gap-2 items-center",
              row.original.status == 0 && "block"
            )}
            onClick={async () => setIsDeny(true)}
          >
            Deny
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsDelete(true)}
            className="gap-2 items-center text-red-500"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeny}>
        <DialogContent
          onInteractOutside={() => setIsDeny(false)}
          onXClick={() => setIsDeny(false)}
          className="gap-0 rounded-md w-72 sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
              Deny!
            </DialogTitle>
            <DialogDescription className="text-start ">
              Are you sure, You want to deny ?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-x-3 ">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setIsDeny(false);
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
                  setIsDeny(false);
                  await api_update_sop({
                    id: row.original.id + "",
                    status: "2",
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

      <Dialog open={isApprove}>
        <DialogContent
          onInteractOutside={() => {
            setIsApprove(false);
          }}
          onXClick={() => {
            setIsApprove(false);
          }}
          className="gap-0 rounded-md w-72 sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
              Approve
            </DialogTitle>
            <DialogDescription className="text-start ">
              Please select the user to approve as
            </DialogDescription>
          </DialogHeader>
          <div className="h-3" />
          {approval.length ? (
            <Select
              value={approvalUserId}
              onValueChange={(v) => setApprovalUserId(v)}
            >
              <SelectTrigger className="h-10 w-72">
                {" "}
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {approval.map((v) => {
                    return (
                      <SelectItem key={v.id} value={v.id + ""}>
                        {v.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : null}
          <div className="flex justify-end gap-x-3 ">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setIsApprove(false);
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
                  setIsApprove(false);
                  await api_update_sop({
                    id: row.original.id + "",
                    status: "1",
                    approve_by_user_id: approvalUserId,
                  });
                  setApprovalUserId("6");
                  getData(0);
                }}
              >
                Yes
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDelete}>
        <DialogContent
          className="w-96"
          onInteractOutside={() => setIsDelete(false)}
          onXClick={() => setIsDelete(false)}
        >
          <DialogHeader className="font-semibold text-2xl">
            Delete
          </DialogHeader>
          <DialogDescription>
          Are you sure you want to delete this SOP?
          </DialogDescription>

          <DialogFooter>
            <Button
              variant={"ghost"}
              onClick={async () => {
                setIsDelete(false);
                await api_update_sop({
                  id: row.original.id,
                  status: "-1",
                });

                getData(0);
              }}
            >
              Yes
            </Button>
            <Button variant={"ghost"} onClick={() => setIsDelete(false)}>
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
