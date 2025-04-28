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
import ICustomerServiceCategoryModel from "@/model/customer_service_category_model";
import AddUpdateCustomerServiceCategoryDailog from "@/components/dailog/add-update-customer-service-category/add-update-customer-service-category";
import { api_create_update_category } from "@/network/apis/customer-service/category_api";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (skip: number) => void;
}

export function DataTableRowActions({
  row,
  getData,
}: DataTableRowActionsProps<ICustomerServiceCategoryModel>) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

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

          <DropdownMenuItem
            onClick={async () => {
              setDeleteOpen(true);
            }}
            className="gap-2 items-center"
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
          className="gap-0 rounded-md w-72 sm:w-auto p-3 sm:px-4 pt-3 pb-2 h-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
              Delete!
            </DialogTitle>
            <DialogDescription className="text-start ">
              Are you sure, You want to delete this category ?
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
                  await api_create_update_category({
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
          <AddUpdateCustomerServiceCategoryDailog
            category={row.original}
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
