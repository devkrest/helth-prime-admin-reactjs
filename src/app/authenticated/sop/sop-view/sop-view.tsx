// import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { api_get_sop_details } from "@/network/apis/sop_api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ISopRevision } from "@/model/sop_model";

const temp = {
  title: "",
  sopNumber: "",
  versionNumber: "",
  supersedes: "",
  purpose: "",
  scope: "",
  responsibilities: "",
  procedure: [""],
  safety: "",
  quality: "",
  references: "",
  attachments: "",
  revision: [] as ISopRevision[],
  department_name: "",
  review_Date: format(Date.now(), "MM-dd-yyyy"),
  approved_by_name: "",
  prepared_by_name: "",
};

function ViewSopPage() {
  const { id } = useParams();
  const [resData, setResData] = useState(temp);
  const [isLoading, setIsLoading] = useState(false);

  const getDetails = async () => {
    setIsLoading(true);
    const d = await api_get_sop_details({ id });
    if (d && d.s && d.r) {
      const {
        title,
        data: {
          attachments,
          procedure,
          purpose,
          quality,
          references,
          responsibilities,
          safety,
          scope,
        },
        supersedes,
        sop_number,
        version_number,
        created_at,
        department_name,
        approved_by_name,
        revision,
        prepared_by_name,
      } = d.r;
      setResData({
        title,
        supersedes,
        sopNumber: sop_number,
        versionNumber: version_number,
        attachments,
        procedure,
        purpose,
        quality,
        references,
        responsibilities,
        safety,
        scope,
        revision: revision ?? [],
        department_name: department_name ?? "",
        review_Date: format(created_at, "MM-dd-yyyy"),
        approved_by_name: approved_by_name ?? "",
        prepared_by_name: prepared_by_name ?? "",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, []);

  return (
    <ScrollArea className="h-[90vh] mt-16">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : !resData.prepared_by_name ? (
        <div className="flex justify-center items-center h-96">
          <p>This SOP is not available or couldn't load.</p>
        </div>
      ) : (
        <div className=" p-6 py-4">
          <p className="text-xl text-primary">Standard Operating Procedure </p>
          <p className="text-muted-foreground/80 text-sm">
            Department - {resData.department_name}
          </p>

          <div className="h-3" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="text-primary font-semibold">Classification</span>{" "}
              - <span className="text-muted-foreground">Out Bound Cells</span>
            </p>

            <div className="h-3" />

            <div className="flex gap-x-6">
              <div className="w-full">
                <Label>Title</Label>
                <Input
                  disabled
                  value={resData.title}
                  onChange={(v) =>
                    setResData((p) => ({ ...p, title: v.target.value }))
                  }
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>

              <div className="w-full">
                <Label>SOP Number</Label>
                <Input
                  disabled
                  value={resData.sopNumber}
                  onChange={(v) =>
                    setResData((p) => ({ ...p, sopNumber: v.target.value }))
                  }
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>

              <div className="w-full">
                <Label>Version Number</Label>
                <Input
                  disabled
                  value={resData.versionNumber}
                  onChange={(v) =>
                    setResData((p) => ({ ...p, versionNumber: v.target.value }))
                  }
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>

              <div className="w-full">
                <Label>Effective Date</Label>
                <Input
                  disabled
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                  value={resData.review_Date}
                />
              </div>
            </div>

            <div className="h-3" />

            <div className="flex gap-x-6">
              <div className="w-full">
                <Label>Supersedes</Label>
                <Input
                  disabled
                  value={resData.supersedes}
                  onChange={(v) =>
                    setResData((p) => ({ ...p, supersedes: v.target.value }))
                  }
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>

              <div className="w-full">
                <Label>Prepared By</Label>
                <Input
                  value={resData.prepared_by_name}
                  disabled
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>

              <div className={cn("w-full hidden", id && "block")}>
                <Label>Review Date</Label>
                <Input
                  disabled
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                  value={resData.review_Date}
                />
              </div>

              <div className={cn("w-full hidden", id && "block")}>
                <Label>Approved By</Label>
                <Input
                  disabled
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                  value={resData.approved_by_name}
                />
              </div>
            </div>
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">1. Purpose</span> -{" "}
              <span className="text-muted-foreground">
                This section describes the objective of the SOP and why it is
                necessary.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.purpose}
              onChange={(v) =>
                setResData((p) => ({ ...p, purpose: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">2. Scope</span> -{" "}
              <span className="text-muted-foreground">
                This section defines who the SOP applies to and what activities
                or processes it covers.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.scope}
              onChange={(v) =>
                setResData((p) => ({ ...p, scope: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">
                3. Responsibilities
              </span>{" "}
              -{" "}
              <span className="text-muted-foreground">
                Outline the roles and responsibilities of individuals or
                departments involved in the procedure.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.responsibilities}
              onChange={(v) =>
                setResData((p) => ({ ...p, responsibilities: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">4. Procedure</span> -{" "}
              <span className="text-muted-foreground">
                Detailed, step-by-step instructions on how to perform the
                procedure. This section may include sub-sections such as:
              </span>
            </p>

            <div className="h-3" />

            {resData.procedure.map((v) => {
              return <Textarea
              disabled
              value={v}
              className="focus-visible:ring-0 my-2 focus-visible:ring-transparent"
            />
              // <p key={v}><span className="pr-1 text-primary">{`Step - ${i+1}`} : </span>{v}</p>;
            })}
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">
                5. Safety and Precautions
              </span>{" "}
              -{" "}
              <span className="text-muted-foreground">
                Steps or checks to ensure the procedure meets quality standards
                and requirements.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.safety}
              onChange={(v) =>
                setResData((p) => ({ ...p, safety: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">
                6. Quality Control
              </span>{" "}
              -{" "}
              <span className="text-muted-foreground">
                Steps or checks to ensure the procedure meets quality standards
                and requirements.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.quality}
              onChange={(v) =>
                setResData((p) => ({ ...p, quality: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">7. References</span>{" "}
              -{" "}
              <span className="text-muted-foreground">
                List any documents, manuals, or references used in preparing the
                SOP or that should be consulted during the procedure.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.references}
              onChange={(v) =>
                setResData((p) => ({ ...p, references: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div className="bg-muted/40 p-6 py-4 rounded-md">
            <p className="text-lg">
              <span className="font-semibold text-primary">
                8. Attachments and Appendices
              </span>{" "}
              -{" "}
              <span className="text-muted-foreground">
                Include any forms, checklists, templates, or additional
                information relevant to the procedure.
              </span>
            </p>

            <div className="h-3" />

            <Textarea
              disabled
              value={resData.attachments}
              onChange={(v) =>
                setResData((p) => ({ ...p, attachments: v.target.value }))
              }
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>

          <div className="h-5" />

          <div
            className={cn(
              "bg-muted/40 p-6 py-4 rounded-md hidden",
              resData.revision.length && "block"
            )}
          >
            <p className="text-lg">
              <span className="font-semibold text-primary">
                9. Revision History
              </span>{" "}
              -{" "}
              <span className="text-muted-foreground">
                Table or record of changes made to the SOP, including the date,
                description of change, and the person who made the change.
              </span>
            </p>

            <div className="h-3" />
            <div>
              {resData.revision.map((v) => {
                return (
                  <p>
                    <span className="text-primary">
                      {" "}
                      {format(v.created_at, "MM-dd-yyyy")}
                    </span>{" "}
                    : <span className="text-muted-foreground">{v.reason}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </ScrollArea>
  );
}

export default ViewSopPage;
