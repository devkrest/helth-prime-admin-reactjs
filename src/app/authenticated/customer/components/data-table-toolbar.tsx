"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import Papa from "papaparse";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, RefreshCcwIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddUpdateCustomerDailog from "@/components/dailog/add-update-customer/add-update-customer";
import { ICustomerModel } from "@/model/customer_model";
import { toast } from "sonner";
import { api_create_update_customer_bluck } from "@/network/apis/customer_api";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number) => void;
}

export function DataTableToolbar<TData>({
  table,
  search,
  setSearch,
  getData,
}: DataTableToolbarProps<TData> & Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [open, setOpen] = useState(false);
  const [openCsv, setOpenCsv] = useState(false);
  const [user, setUser] = useState<ICustomerModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const importUser = async () => {
    setIsLoading(true);

    // for (let v of user) {
    //   const res = await api_create_update_customer(v);

    //   if (res.s) {
    //     toast("success");
    //   } else {
    //     //toast(res.m ?? "Opps! something went wrong. Please try again.");
    //   }
    // }

    const res = await api_create_update_customer_bluck({
      data: JSON.stringify(user),
    });

    if (res.s) {
      toast("success");
    }

    setUser([]);
    setOpenCsv(false);
    setIsLoading(false);
    getData(0);
  };

  const handleSelectCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const ext = e.target.files[0].name.split(".").pop();

      if (ext === "csv") {
        Papa.parse(e.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results: any) {
            //console.log(results.data[0]);
            const t: ICustomerModel[] = results.data as ICustomerModel[];

            let o = true;
            for (let v of t) {
              if (!v.carrier || !v.lead_id || !v.name || !v.state) {
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

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <label
        className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        htmlFor="file"
      >
        Import Customer
      </label>
      <input
        value=""
        onChange={handleSelectCsv}
        accept=".csv"
        type="file"
        id="file"
        className="hidden"
      />

      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            variant="outline"
            className="h-8"
          >
            Add Customer
          </Button>
        </DialogTrigger>
        {open && (
          <AddUpdateCustomerDailog
            onClose={(v) => {
              setOpen(false);
              if (v) {
                getData(0);
              }
            }}
          />
        )}
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.location.reload()}
      >
        <RefreshCcwIcon />
      </Button>

      {/* <DataTableViewOptions table={table} /> */}

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
          <p className="text-lg font-bold">Import Customers</p>
          <p>Are you sure, you want to import customers.</p>

          <div className="flex justify-end gap-4">
            <DialogClose
              onClick={() => {
                importUser();
              }}
            >
              {isLoading ? (
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
    </div>
  );
}
