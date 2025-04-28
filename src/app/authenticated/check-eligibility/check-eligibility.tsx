import { IUserEligibleModel } from "@/model/user_eligibility_model";
import { api_check_user_eligibility } from "@/network/apis/user_eligibility_api";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { carriers, states } from "@/lib/const-value";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { api_all_user_list } from "@/network/apis/user_api";
import { IUserModel } from "@/model/user_model";
import { toast } from "sonner";

function CheckEligibility() {
  const [openDailog, setDailog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<null | IUserEligibleModel>(null);

  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [selectedCarrier, setSelectedCarrier] = useState<string | undefined>(
    undefined
  );
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );
  const [user, setUser] = useState<IUserModel[]>([]);

  const getData = async () => {
    if (!selectedUser) {
      toast("Please select the agent.");
    } else if (!selectedState) {
      toast("Please select the state.");
    } else if (!selectedCarrier) {
      toast("Please select the carrier.");
    } else {
      setIsLoading(true);
      const result = await api_check_user_eligibility({
        state: selectedState,
        carrier: selectedCarrier,
        user_id: selectedUser,
      });

      if (result && result.s && result.r) {
        setData(result.r);
      } else {
        setData(null);
      }
      setDailog(true);
      setIsLoading(false);
    }
  };

  const getName = () => {
    if (data) {
      if (
        data?.aor == "Yuliana" ||
        data?.aor == "Nathalia" ||
        data?.aor == "Lisette" ||
        data?.aor == "Palacio" ||
        data?.aor == "Michelle" ||
        data?.aor == "Lingo"
      ) {
        return `${data?.aor}`;
      } else {
        if (
          data?.aor.split("Not Appt").length > 1 &&
          data?.aor.toLowerCase().includes("not appt") &&
          data.blacklist == 0
        ) {
          return data?.aor.split("Not Appt")[1];
        } else {
          return "Do Not Sell";
        }
        //return "Do Not Sell";
      }
    } else {
      return "Do Not Sell";
    }
  };

  const getBgColor = () => {
    if (data) {
      if (
        data.aor == "Yuliana" ||
        data.aor == "Nathalia" ||
        data.aor == "Lisette" ||
        data.aor == "Palacio" ||
        data.aor == "Michelle" ||
        data.aor == "Lingo"
      ) {
        return " bg-blue-100 text-blue-500 ";
      } else if (
        data.aor.split("Not Appt").length > 1 &&
        data.aor.toLowerCase().includes("not appt") &&
        data.blacklist == 0
      ) {
        return " bg-blue-100 text-blue-500 ";
      } else {
        return " bg-red-100 text-red-500 ";
      }
    } else {
      return "  bg-red-100 text-red-500  ";
    }
  };

  const canShow = () => {
    if (data) {
      if (
        data.aor == "Yuliana" ||
        data.aor == "Nathalia" ||
        data.aor == "Lisette" ||
        data.aor == "Palacio" ||
        data.aor == "Michelle" ||
        data.aor == "Lingo"
      ) {
        return true;
      } else if (
        data.aor.split("Not Appt").length > 1 &&
        data.aor.toLowerCase().includes("not appt") &&
        data.blacklist == 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const canShowTextForAapt = () => {
    if (data) {
      if (data.aor == "Not Appt" && data.blacklist == 1) {
        return true;
      } else if (
        data.aor.split("Not Appt").length > 1 &&
        data.aor.toLowerCase().includes("not appt") &&
        data.blacklist == 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      false;
    }
  };

  const getAgent = async () => {
    const user = await api_all_user_list();

    if (user && user.s && user.r) {
      setUser(user.r);
    }
  };

  useEffect(() => {
    getAgent();
  }, []);

  return (
    <div className="h-full w-full pt-20 px-24">
      <p className="text-xl mb-5">BPO Auditing</p>
      <div className="flex   gap-x-0 ">
        <Select value={selectedUser} onValueChange={(v) => setSelectedUser(v)}>
          <SelectTrigger className=" w-[200px] rounded-r-none focus:outline-none">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>User</SelectLabel>
              {user.map((v) => {
                return (
                  <SelectItem key={v.id} value={`${v.id}`}>
                    {v.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={selectedState}
          onValueChange={(v) => setSelectedState(v)}
        >
          <SelectTrigger className=" w-[160px] rounded-none focus:outline-none">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>State</SelectLabel>
              {Object.keys(states).map((v) => {
                return (
                  <SelectItem key={v} value={states[v as keyof typeof states]}>
                    {v}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={selectedCarrier}
          onValueChange={(v) => setSelectedCarrier(v)}
        >
          <SelectTrigger className="w-[160px] focus:outline-none rounded-none">
            <SelectValue placeholder="Select a carrier" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Carrier</SelectLabel>
              {carriers.map((v) => {
                return (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            getData();
          }}
          disabled={!!!selectedCarrier || !!!selectedState || isLoading || !!!selectedUser}
          className="rounded-l-none hover:bg-primary"
        >
          {isLoading ? <Loader className="animate-spin" /> : "Submit"}
        </Button>

        <Dialog open={openDailog}>
          {openDailog && (
            <DialogContent
              className="max-w-[31rem]"
              onXClick={() => setDailog(false)}
              onInteractOutside={() => setDailog(false)}
            >
              <div className="flex gap-x-2">
                <p
                  className={cn(
                    ` hidden text-right p-1 px-3  rounded-sm font-medium bg-red-100 text-red-500`,
                    canShowTextForAapt() && "block"
                  )}
                >
                  Not Appointed
                </p>

                <p
                  className={cn(
                    "text-white p-3 rounded-md py-1 hidden bg-green-500",
                    canShow() && "block"
                  )}
                >
                  AOR Override OK
                </p>
                <p
                  className={cn(
                    getBgColor(),
                    " p-1 px-3  rounded-sm font-medium"
                  )}
                >
                  {getName()}
                </p>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}

export default CheckEligibility;
