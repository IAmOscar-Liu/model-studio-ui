import { Outlet } from "react-router";
import { PageDataProvider } from "./PageData";
import Header from "@/components/Header";

function RootLayout() {
  return (
    <PageDataProvider>
      <div className="p-8">
        <Header />
        <Outlet />
      </div>
    </PageDataProvider>
  );
}

export default RootLayout;
