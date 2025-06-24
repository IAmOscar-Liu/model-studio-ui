import Header from "@/components/Header";
import CurrentFederatedPartners from "@/feature/home/CurrentFederatedPartners";
import LatestModelTrained from "@/feature/home/LatestModelTrained";
import ModelTrainingHistory from "@/feature/home/ModelTrainingHistory";
import ModelTrainingPanel from "@/feature/home/ModelTrainingPanel";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trainingStatus = queryParams.get("status");

  return (
    <>
      <Header />
      <h1 className="py-6 text-2xl font-medium">Model Studio</h1>
      <div className="space-y-6">
        {trainingStatus === "finished" && (
          <LatestModelTrained className="mb-6" />
        )}
        <ModelTrainingPanel status={trainingStatus ?? undefined} />
        <ModelTrainingHistory />
        <CurrentFederatedPartners className="mt-6" />
      </div>
    </>
  );
}

export default Home;
