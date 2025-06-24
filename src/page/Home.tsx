import CurrentFederatedPartners from "@/feature/home/components/CurrentFederatedPartners";
import LatestModelTrained from "@/feature/home/components/LatestModelTrained";
import ModelTrainingHistory from "@/feature/home/components/ModelTrainingHistory";
import ModelTrainingPanel from "@/feature/home/components/ModelTrainingPanel";
import { PageTitle } from "@/router/layout/PageData";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trainingStatus = queryParams.get("status");

  // const breadcrumbs: Array<PageLink> = useMemo(
  //   () => [
  //     {
  //       title: "Model Studio",
  //       path: "/",
  //     },
  //   ],
  //   [],
  // );

  return (
    <>
      <PageTitle href="/">Model Studio</PageTitle>

      <h1 className="py-6 text-2xl font-medium">Model Studio</h1>
      <div className="space-y-6">
        {trainingStatus === "finished" && (
          <LatestModelTrained className="mb-6" />
        )}
        <ModelTrainingPanel status={trainingStatus ?? undefined} />
        <ModelTrainingHistory />
        <CurrentFederatedPartners />
      </div>
    </>
  );
}

export default Home;
