import CustomLineChart from "@/components/chart/CustomLineChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { CustomChartData } from "@/type/ChartData";

const mockChartData: CustomChartData = {
  data: [
    {
      dataKey: "hospital A",
      color: "#80B4FF",
      data: [0.12, 0.18, 0.25, 0.32, 0.4, 0.48, 0.55, 0.63, 0.7, 0.78],
    },
    {
      dataKey: "hospital B",
      color: "#E86997",
      data: [0.1, 0.16, 0.2, 0.28, 0.36, 0.44, 0.52, 0.61, 0.69, 0.77],
    },
    {
      dataKey: "global",
      color: "#777777",
      data: [0.11, 0.17, 0.23, 0.3, 0.38, 0.47, 0.56, 0.65, 0.74, 0.82],
    },
  ],
  xAxis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  yAxis: [0, 0.25, 0.5, 0.75, 1],
  min: 0,
  max: 1,
};

function ModelTrainingHistory({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 rounded-[12px] border p-6", className)}>
      <Accordion type="single" collapsible>
        {[
          "2025/05/07 11:34:19",
          "2025/05/06 11:34:19",
          "2025/05/05 11:34:19",
        ].map((dateTime) => (
          <AccordionItem key={dateTime} value={dateTime}>
            <AccordionTrigger className="text-lg font-medium">
              {dateTime}
            </AccordionTrigger>
            <AccordionContent className="p-6">
              <div className="overflow-x-auto rounded-md border shadow-md">
                <h1 className="px-6 py-4 text-lg font-medium">
                  Accuracy Dashboard
                </h1>
                <div className="me-6 mt-4 mb-4 aspect-[1072/389] max-w-[1072px] min-w-[760px]">
                  <CustomLineChart
                    {...mockChartData}
                    formatYAxis={(value) =>
                      typeof value === "number" ? `${value * 100}%` : value
                    }
                    formatTooltipLabel={(label) => (
                      <p>
                        <strong>Epoch:</strong> {label}
                      </p>
                    )}
                    formatTooltipValue={(value) =>
                      typeof value === "number"
                        ? `${(value * 100).toFixed(1)}%`
                        : value
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ModelTrainingHistory;
