"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { IUserModel } from "@/model/user_model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Loader, Plus, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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
import {
  api_customer_service_add_customer,
  api_customer_service_get_agent_list_light,
  api_customer_service_get_total_remaining,
  api_customer_service_get_total_remaining_by_agent,
  api_customer_service_swap_by_agent,
} from "@/network/apis/customer-service/user_lead_api";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  getData: (skip: number) => void;
}

export function DataTableRowActions({
  row,
  getData,
}: DataTableRowActionsProps<IUserModel>) {
  const [editOpen, setEditOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);

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
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem
            onClick={async () => {
              setEditOpen(true);
            }}
            className="gap-2 items-center"
          >
            <Plus size={15} />
            Assign Customer
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={async () => {
              setSwapOpen(true);
            }}
            className="gap-2 items-center"
          >
            <RefreshCcw size={15} />
            Swap Customer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editOpen}>
        {editOpen && (
          <Content
            row={row}
            onClose={(v) => {
              setEditOpen(false);
              if (v) {
                getData(0);
              }
            }}
          />
        )}
      </Dialog>

      <Dialog open={swapOpen}>
        {swapOpen && (
          <ContentSwap
            row={row}
            onClose={(v) => {
              setSwapOpen(false);
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

function Content({
  onClose,
  row,
}: {
  onClose: (v: boolean) => void;
  row: Row<IUserModel>;
}) {
  const [total, setTotal] = useState<{ total_remaining_cust: string | number }>(
    {
      total_remaining_cust: 0,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<number | undefined>(undefined);

  const getTotal = async () => {
    const data = await api_customer_service_get_total_remaining({});

    if (data && data.s) {
      setTotal(data.r ?? { total_remaining_cust: 0 });
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <DialogContent
      onInteractOutside={() => onClose(false)}
      onXClick={() => onClose(false)}
      className="gap-0 rounded-md w-[31.5rem] p-3 sm:px-4 pt-3 pb-2 h-auto"
    >
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
          Assign Customer{" "}
        </DialogTitle>
        <span className="text-orange-500 text-sm">
          Number of customers remaining: {total.total_remaining_cust}
        </span>
      </DialogHeader>

      <Label className="mt-3">Number of customers to assign</Label>
      <Input
        placeholder=""
        value={customer}
        type="number"
        className="mt-2"
        onChange={(v) => {
          if (v.target.value?.length) {
            setCustomer(+v.target.value);
          } else {
            setCustomer(undefined);
          }
        }}
      />

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
                if (customer) {
                  setIsLoading(true);
                  await api_customer_service_add_customer({
                    user_id: row.original.id,
                    number_of_user: customer,
                  });
                  setIsLoading(false);
                  onClose(true);
                } else {
                  toast("Please fill the input");
                }
              }}
            >
              Add
            </Button>
          )}
        </DialogClose>
      </div>
    </DialogContent>
  );
}

function ContentSwap({
  onClose,
  row,
}: {
  onClose: (v: boolean) => void;
  row: Row<IUserModel>;
}) {
  const [total, setTotal] = useState<{ total_remaining_cust: string | number }>(
    {
      total_remaining_cust: 0,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toUser, setToUse] = useState<{ name: string; id: number }[]>([]);
  const [customer, setCustomer] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const getTotal = async () => {
    const data = await api_customer_service_get_total_remaining_by_agent({
      user_id: row.original.id,
    });

    if (data && data.s) {
      setTotal(data.r ?? { total_remaining_cust: 0 });
    }
  };

  const getAgentList = async () => {
    const res = await api_customer_service_get_agent_list_light({});

    if (res && res.s && res.r) {
      setToUse(res.r);
    }
  };

  useEffect(() => {
    getAgentList();
  }, []);

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <DialogContent
      onInteractOutside={() => onClose(false)}
      onXClick={() => onClose(false)}
      className="gap-0 rounded-md w-[31.5rem] p-3 sm:px-4 pt-3 pb-2 h-auto"
    >
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-2xl self-start tracking-wide">
          Swap Customer{" "}
        </DialogTitle>
        <span className="text-orange-500 text-sm">
          Number of customers: {total.total_remaining_cust}
        </span>
      </DialogHeader>

      <Label className="mt-3">Number of customers to swap</Label>
      <Input
        placeholder=""
        value={customer}
        type="number"
        className="mt-2"
        onChange={(v) => {
          if (v.target.value?.length) {
            setCustomer(+v.target.value);
          } else {
            setCustomer(undefined);
          }
        }}
      />
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
                if (!customer) {
                  toast("Please fill the input");
                } else if (!value) {
                  toast("Please select agent");
                } else {
                  setIsLoading(true);
                  await api_customer_service_swap_by_agent({
                    from_user_id: row.original.id,
                    to_user_id: value,
                    number_of_customer: customer,
                  });
                  setIsLoading(false);
                  onClose(true);
                }
              }}
            >
              Swap
            </Button>
          )}
        </DialogClose>
      </div>
    </DialogContent>
  );
}
