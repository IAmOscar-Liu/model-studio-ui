import { cn } from "@/lib/utils";
import clinicalStudiesManagement from "@/assets/clinical-studies-management.png";

function CurrentFederatedPartners({ className }: { className?: string }) {
  return (
    <div
      className={cn("space-y-4 rounded-[12px] border p-6 shadow-md", className)}
    >
      <h1 className="text-[28px]">Currently Federated Partners</h1>

      <ul className="list-disc ps-6 text-xl">
        <li>Model name and version</li>
        <li>Accuracy and loss scores</li>
        <li>Originator (hospital name, PI name, country)</li>
        <li>Indicator for Global Model status</li>
      </ul>

      <div className="mx-auto aspect-[853/480] max-w-[853px]">
        <img className="size-full" src={clinicalStudiesManagement} alt="" />
      </div>
    </div>
  );
}

export default CurrentFederatedPartners;
