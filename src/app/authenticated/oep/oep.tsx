import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { download, generateCsv, mkConfig } from "export-to-csv";
import Papa from "papaparse";
import { useState } from "react";
import * as XLSX from "xlsx";

function OepPage() {
  const [file, setFile] = useState(false);
  const [_, setSuccessAlert] = useState(false);
  const [fileData, setData] = useState<File | undefined | null>();
  const [errorString, setErrorString] = useState("");


  function parseCSV(e: File) {
    Papa.parse(e, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        let errorString = "";
        let excelData = [];
        //console.log(results.data);
        for (let index = 0; index < results.data.length; index++) {
          const data: any = results.data[index];
          if (data["STATE"]) {
            let shortState = states[data["STATE"] as keyof typeof states];
            if (shortState) {
              var keys = Object.keys(data);
              let license = data["LICENSE"];
              let licenseType = data["LICENSE TYPE"];
              let blackList = data["BLACKLIST"] ?? false;
              for (const k in keys) {
                const key = keys[k];
                if (
                  key !== "LICENSE" &&
                  key !== "LICENSE TYPE" &&
                  key !== "STATE" &&
                  key !== "BLACKLIST"
                ) {
                  let stateKey = key === "BCBS" ? `${key}_${shortState}` : key;
                  let tld_id = carriers_with_tld_id[ stateKey as keyof typeof carriers_with_tld_id] ;
                  if (tld_id) {
                    excelData.push({
                      state: shortState,
                      carrier: key,
                      carrier_id: tld_id,
                      aor: data[key],
                      license: license,
                      license_type: licenseType,
                      blacklist: blackList ? (blackList === "Y" ? 1 : 0) : 0,
                    });
                  } else {
                    errorString += `\n${stateKey} is not matched with TLD Carriers, please format excel properly or contact Team Devkrest`;
                  }
                }
              }
            } else {
              errorString += `\n${data["STATE"]} is not matched with our records, please format excel properly`;
            }
          } else {
            errorString += `\nRecord missing State or not properly formatted`;
          }
        }
        setErrorString(errorString);
        downloadExcelCSV(excelData, e.name);
      },
    });
  }
  
  return (
    <div className=" mt-10">
      <div className="  justify-center  items-center flex flex-col">
        <div className="justify-center px-6 mb-12 mt-12 items-center flex">
          <p className=" text-3xl text-center text-gray-800">
            Parse Cozmo OEP Excel for Cozmo Gearz
          </p>
        </div>

        <div className="">
          <Button
            variant="outline"
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="dark"
            onClick={() => downloadStateXls(states)}
            className="w-[22rem] rounded-b-none bg-primary text-white"
          >
            Click To Download State Abbreviation Excel
          </Button>
        </div>

        <div className="border p-5 rounded-md w-[22rem] rounded-t-none">
          <div className="justify-center items-center flex flex-col">
            <label htmlFor="file_input">
              <p className={cn(buttonVariants({ variant: "outline" }))}>
                Choose a file
              </p>
            </label>
            <input
              onClick={(event) => {
                if (event.currentTarget.value) {
                  event.currentTarget.value = "";
                }
              }}
              className="hidden text-sm  focus:outline-none  border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              aria-describedby="file_input_help"
              id="file_input"
              accept=".csv"
              type="file"
              onChange={(v) => {
                setFile(true);
                if (v.target.files?.length) {
                  setData(v.target.files[0]);
                }
              }}
            />
            {!!fileData && (
              <p className="font-bold text-sm">
                File Name :{" "}
                <span className="text-muted-foreground">{fileData.name}</span>
              </p>
            )}
            <p className="mt-4 mb-6 text-sm text-gray-800" id="file_input_help">
              Only CSV files are allowed :)
            </p>
            {file ? (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(false);
                    setData(null);
                    setErrorString("");
                  }}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Remove File
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (fileData) {
                      setSuccessAlert(true);
                      parseCSV(fileData);
                    }
                  }}
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  Convert for Gearz
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            {errorString.length > 0 ? (
              <ScrollArea className=" h-40 border p-2 rounded-md">
                <p>
                  <span className="font-bold">
                    Few Warnings and Data Parsing issues. Please double check
                    the excel before importing into Gearz
                  </span>
                  <br/>
                  <br/>
                  {errorString.split("\n").map((str) => (
                    <span>{str}</span>
                  ))}
                </p>
              </ScrollArea>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const states = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const carriers_with_tld_id = {
  Aetna: "14",
  Alliant: "194",
  Ambetter: "57",
  AmeriH: "225",
  Anthem: "20",
  AvMed: "",
  BCBS_AZ: "101",
  BCBS_IL: "45",
  BCBS_KS: "213",
  BCBS_MI: "30",
  BCBS_NE: "656",
  BCBS_OK: "31",
  BCBS_SC: "63",
  BCBS_TN: "242",
  BCBS_TX: "29",
  CareSource: "225",
  Christus: "193",
  Cigna: "19",
  HealthAlliance: "253",
  HighMark: "343",
  Molina: "73",
  Oscar: "158",
  UHC: "6",
  Wellpoint:"658"
};

function downloadStateXls(data: any) {
  var ws = XLSX.utils.json_to_sheet([data]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "US States");
  XLSX.writeFile(wb, "State Abbreviation and Forms.xlsx");
  setTimeout(()=>window.location.reload(),400);
}

function downloadExcelCSV(data: any, name: any) {
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `Converted_${name.split(".")[0]}` ,
  });
  const csv = generateCsv(csvConfig)(data);
  download(csvConfig)(csv);
  setTimeout(()=>window.location.reload(),400);
}

export default OepPage;
