import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { ProfileDashboard } from "./components/ProfileDashboard";
import { ViaDashboard } from "./components/ViaDashboard";
import { BMTrungGianDashboard } from "./components/BMTrungGianDashboard";
import { LinkInviteDashboard } from "./components/LinkInviteDashboard";
import { ReportDashboard } from "./components/ReportDashboard";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#F8F9FA" }}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 overflow-auto">
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "list-profile" && <ProfileDashboard />}
        {activeView === "via" && <ViaDashboard />}
        {activeView === "bm-trung-gian" && <BMTrungGianDashboard />}
        {activeView === "link-invite" && <LinkInviteDashboard />}
        {activeView === "report" && <ReportDashboard />}
      </div>
    </div>
  );
}
