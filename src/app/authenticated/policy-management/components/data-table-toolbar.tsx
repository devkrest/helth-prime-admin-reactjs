"use client";

import { Table } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcwIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUserModel } from "@/model/user_model";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getData: (skip: number, callStatus: string, userId: string,pickDate: Date | undefined, searchV:string) => void;
  callStatus: string;
  setCallStatus: React.Dispatch<React.SetStateAction<string>>;
  selectedUserId: string | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
  user: IUserModel[];
  pickDate: Date | undefined;
  setPickDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DataTableToolbar<TData>({
  search,
  setSearch,
  callStatus,
  setCallStatus,
  selectedUserId,
  setSelectedUserId,
  user = [],
  pickDate,
  setPickDate,
}: DataTableToolbarProps<TData> & Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by (Lead Name)"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 w-[150px] lg:w-[320px]"
        />
      </div>

      <Select value={callStatus} onValueChange={(v) => setCallStatus(v)}>
        <SelectTrigger className="w-[180px]">
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
              "w-[240px] pl-3 text-left font-normal",
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
              buttonVariants(),
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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a user</SelectLabel>

              {user.map((v) => {
                return <SelectItem value={`${v.id}`}>{v.name}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.location.reload()}
      >
        <RefreshCcwIcon />
      </Button>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
