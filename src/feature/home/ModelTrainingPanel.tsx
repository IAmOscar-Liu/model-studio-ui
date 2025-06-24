import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import trainingResourceIcon from "@/assets/training-resource-icon.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomAlertDialog from "@/components/dialog/CustomAlertDialog";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const mockTrainingResource = [
  {
    id: "1",
    vCPU: "4 (2 cores)",
    memory: "16 GB",
    details: [
      "Assigned To- UMMC Malaysia",
      "Managed By - SYMPTOMTRACE - TAIWAN",
      "Location:  Malaysia Telecom Server",
    ],
  },
  {
    id: "2",
    vCPU: "4 (2 cores)",
    memory: "16 GB",
    details: [
      "Assigned:  Available",
      "Managed By - SYMPTOMTRACE - TAIWAN",
      "Location:  SYMPTONTRACE - TAIWAN",
    ],
  },
  {
    id: "3",
    vCPU: "4 (2 cores)",
    memory: "16 GB",
    details: [
      "Managed by UMMC (Hana) - Malaysia - August (Manual provisioned) - Labeling/Federated Learning",
      "Location: UMMC",
    ],
  },
];

function ModelTrainingPanel({
  className,
  status,
}: {
  className?: string;
  status?: string;
}) {
  return (
    <div className={cn("rounded-2xl border p-6", className)}>
      <h1 className="mb-4 text-[28px]">Model Training Panel</h1>
      {status === "training" ? (
        <Training />
      ) : status === "finished" ? (
        <Finished />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

function Dashboard({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<
    string | undefined
  >();

  const handleImport = () => {
    navigate("/?status=training");
  };

  return (
    <div
      className={cn(
        "mt-4 flex flex-col gap-3 rounded-[12px] border p-4 shadow-md",
        className,
      )}
    >
      <h1 className="text-[18px]">
        Select an AI model and the number of epochs to begin training
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4">
        <div className="space-y-2">
          <Label htmlFor="ai-mode">AI Model Selection</Label>
          <Select>
            <SelectTrigger id="ai-mode" className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="model A">Model A</SelectItem>
              <SelectItem value="model B">Model B</SelectItem>
              <SelectItem value="model C">Model C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="epoch">Epoch Selection</Label>
          <Select>
            <SelectTrigger id="epoch" className="w-full">
              <SelectValue placeholder="Select epoch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="training-mode">Training Mode Selection</Label>
          <Select>
            <SelectTrigger id="training-mode" className="w-full">
              <SelectValue placeholder="Select Training Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single node">Single node</SelectItem>
              <SelectItem value="double node">Double node</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Label className="mt-2">Training Resource Selector</Label>
      <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-4">
        {mockTrainingResource.map(({ id, vCPU, memory, details }) => (
          <div
            key={id}
            className={cn(
              "border-foreground hover:bg-foreground/10 flex items-center gap-4 rounded-md border px-6 py-4",
              { "bg-foreground/10": id === selectedResource },
              { "cursor-pointer": id !== selectedResource },
            )}
            onClick={() => setSelectedResource(id)}
          >
            <img
              className="size-6 shrink-0"
              src={trainingResourceIcon}
              alt=""
            />
            <div className="shrink-0 space-y-1">
              <p className="font-bold">vCPU</p>
              <p className="font-medium">{vCPU}</p>
            </div>
            <div className="shrink-0 space-y-1">
              <p className="font-bold">Memory</p>
              <p className="font-medium">{memory}</p>
            </div>
            <div className="space-y-1">
              {details.map((detail, dIdx) => (
                <p key={dIdx} className="text-xs">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-end">
        <Button className="rounded-full" onClick={handleImport}>
          Import into the sandbox
        </Button>
      </div>
    </div>
  );
}

function Training({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(0);

  // Add timer effect to simulate training progress
  useEffect(() => {
    if (percentage >= 100) {
      // Navigate to finished status when done
      navigate("/?status=finished", { replace: true });
      return;
    }
    const timer = setTimeout(() => {
      setPercentage((prev) => Math.min(prev + 5, 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage, navigate]);

  return (
    <div
      className={cn("space-y-2 rounded-[12px] border p-4 shadow-md", className)}
    >
      <p className="text-lg">
        Your model is currently in training...... {percentage}%
      </p>
      <div className="flex justify-end">
        <CustomAlertDialog
          title="Cancel the current training?"
          content="Canceling will delete the current model training."
          trigger={<Button variant="outline">Cancel</Button>}
          onAction={() => navigate("/", { replace: true })}
        />
      </div>
    </div>
  );
}

function Finished({ className }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <div
      className={cn("space-y-2 rounded-[12px] border p-4 shadow-md", className)}
    >
      <p className="text-lg">Your model has finished training! 🎉</p>
      <div className="flex justify-end">
        <Button
          className="rounded-full"
          onClick={() => navigate("/?status=training")}
        >
          Import into the sandbox
        </Button>
      </div>
    </div>
  );
}

export default ModelTrainingPanel;
