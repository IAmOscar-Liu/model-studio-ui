import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="p-8">
      <Outlet />
    </div>
  );
}

export default RootLayout;
