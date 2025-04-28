"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Edit2, Loader, RefreshCcw, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ICustomerModel } from "@/model/customer_model";
import AddUpdateCustomerDailog from "@/components/dailog/add-update-customer/add-update-customer";
import { api_create_update_customer } from "@/network/apis/customer_api";
// import { useNavigate } from "react-router-dom";
// import { Update_User_Api } from "@/network/api-call/user";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api_get_agent_list_light, api_swap_by_agent_one } from "@/network/apis/lead-territory/agent_api";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (skip: number) => void;
}

export function DataTableRowActions({
  row,
  getData,
}: DataTableRowActionsProps<ICustomerModel>) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);
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

          <DropdownMenuItem
            onClick={async () => {
              setReassignOpen(true);
            }}
            className={cn(
              "gap-2 items-center",
              !row.original.u_name && "hidden"
            )}
          >
            <RefreshCcw size={15} />
            Reassign
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
              Are you sure, You want to delete this user ?
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
                  await api_create_update_customer({
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
          <AddUpdateCustomerDailog
            customer={row.original}
            onClose={(v) => {
              setEditOpen(false);
              if (v) {
                getData(0);
              }
            }}
          />
        )}
      </Dialog>

      <Dialog open={reassignOpen}>
        {reassignOpen && (
          <ContentSwap
            row={row}
            onClose={(v) => {
              setReassignOpen(false);
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

function ContentSwap({
  onClose,
  row,
}: {
  onClose: (v: boolean) => void;
  row: Row<ICustomerModel>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [toUser, setToUse] = useState<{ name: string; id: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const getAgentList = async () => {
    const res = await api_get_agent_list_light({});

    if (res && res.s && res.r) {
      setToUse(res.r);
    }
  };

  useEffect(() => {
    getAgentList();
  }, []);

  return (
    <DialogContent
      onInteractOutside={() => onClose(false)}
      onXClick={() => onClose(false)}
      className="gap-0 rounded-md w-[31.5rem] p-3 sm:px-4 pt-3 pb-2 h-auto"
    >
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
          Reassign Customer{" "}
        </DialogTitle>
      </DialogHeader>

      <Label className="my-2">Agent</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? toUser.find((framework) => `${framework.id}` === value)?.name
              : "Select agent..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search agent..." className="h-9" />
            <CommandList>
              <CommandEmpty>No agent found.</CommandEmpty>
              <CommandGroup>
                {toUser.map((framework) => (
                  <CommandItem
                    key={framework.id}
                    value={`${framework.name}`}
                    onSelect={() => {
                      setValue(framework.id + "");
                      setOpen(false);
                    }}
                  >
                    {framework.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === `${framework.id}`
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex justify-end gap-x-3 items-center">
        <DialogClose asChild>
          <Button
            onClick={() => {
              onClose(false);
            }}
            type="button"
            variant="link"
            className="p-2"
          >
            Cancel
          </Button>
        </DialogClose>

        <DialogClose asChild>
          {isLoading ? (
            <Loader className="animate-spin h-8" />
          ) : (
            <Button
              className="p-2 text-primary"
              variant="link"
              onClick={async () => {
                if (!value) {
                  toast("Please select agent");
                } else {
                  setIsLoading(true);
                  await api_swap_by_agent_one({
                    from_user_id: row.original.agent_id,
                    to_user_id: value,
                    customer_id: row.original.id,
                  });
                  setIsLoading(false);
                  onClose(true);
                }
              }}
            >
              Assign
            </Button>
          )}
        </DialogClose>
      </div>
    </DialogContent>
  );
}
