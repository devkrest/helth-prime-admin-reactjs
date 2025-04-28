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
import { Edit2, Trash } from "lucide-react";
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
import { api_oep_license_type_add_update } from "@/network/apis/oep-new/oep_license_api";
import { IEligibilityModel } from "@/model/oep_new/oep_eligibility_model";
import AddUpdateManageDailog from "@/components/dailog/oep-new/add-update-manage/add-update-manage";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (skip: number) => void;
  user_id: string;
}

export function DataTableRowActions({
  row,
  getData,
  user_id,
}: DataTableRowActionsProps<IEligibilityModel>) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
          <DropdownMenuItem
            onClick={async () => {
              setDeleteOpen(true);
            }}
            className="gap-2 items-center text-red-500"
          >
            <Trash className="h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteOpen}>
        <DialogContent
          onInteractOutside={() => setDeleteOpen(false)}
          onXClick={() => setDeleteOpen(false)}
          className="gap-0 rounded-md min-w-[28rem] sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
              Delete
            </DialogTitle>
            <DialogDescription className="text-start ">
              Are you sure, You want to delete this License Type ?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-x-3 ">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setDeleteOpen(false);
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
                  setDeleteOpen(false);
                  await api_oep_license_type_add_update({
                    status: "-1",
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
          <AddUpdateManageDailog
            user_id={user_id}
            manage={row.original}
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
