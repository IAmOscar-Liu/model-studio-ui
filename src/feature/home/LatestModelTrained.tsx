import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

function LatestModelTrained({ className }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <div className={cn("rounded-2xl border p-6", className)}>
      <h1 className="text-[28px]">Latest Model Trained</h1>

      <ul className="mb-2 list-disc ps-6 text-xl">
        <li>Model Name (can change)</li>
        <li>Model Accuracy （Model performance metrics）</li>
        <li>Model Version (Can Change)</li>
        <li>Creation date & last training timestamp</li>
      </ul>

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => navigate("/")}>
          Go to Model Library
        </Button>
      </div>
    </div>
  );
}

export default LatestModelTrained;
