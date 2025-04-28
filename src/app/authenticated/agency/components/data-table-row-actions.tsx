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
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IAgencyModel } from "@/model/agency_model";
import AddUpdateAgencyDailog from "@/components/dailog/add-update-agency/add-update-agency";
import { api_create_update_agecny } from "@/network/apis/agency_api";
// import { useNavigate } from "react-router-dom";
// import { Update_User_Api } from "@/network/api-call/user";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (skip: number) => void;
}

export function DataTableRowActions({
  row,
  getData,
}: DataTableRowActionsProps<IAgencyModel>) {
  const [blockOpen, setBlockOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
              setEditOpen(true);
            }}
            className="gap-2 items-center"
          >
            <Edit2 size={15} />
            Edit
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            onClick={async () => {
              setBlockOpen(true);
            }}
            className="gap-2 items-center"
          >
            {row.original.status === 1 ? (
              <BanIcon className="h-4 w-4 " />
            ) : (
              <CheckCheck className="h-4 w-4 " />
            )}

            {row.original.status === 1 ? "Block" : "Active"}
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem
            onClick={async () => {
              navigate(row.original.id);
            }}
            className="gap-2 items-center"
          >
            <EyeIcon className="h-4 w-4 " />
            View
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={blockOpen}>
        <DialogContent
          onInteractOutside={() => setBlockOpen(false)}
          onXClick={() => setBlockOpen(false)}
          className="gap-0 rounded-md w-72 sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
              {row.original.status === 1 ? "Block !" : "Active !"}
            </DialogTitle>
            <DialogDescription className="text-start ">
              Are you sure, You want to{" "}
              {row.original.status === 1 ? "block" : "active"} this user ?
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
                  await api_create_update_agecny({
                    status: row.original.status === 1 ? "2" : "1",
                    id: row.original.id,
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

      <Dialog open={editOpen}>
        {editOpen && (
          <AddUpdateAgencyDailog
            agency={row.original}
            onClose={(v) => {
              setEditOpen(false);
              if (v) {
                getData(0);
              }
            }}
          />
        )}
      </Dialog>
    </>
  );
}
