import { useState } from "react";
import {
  Search,
  Download,
  Upload,
  UserPlus,
  Link2,
  Building2,
  Link as LinkIcon,
  Play,
  Square,
} from "lucide-react";
import { ProfileTable } from "./ProfileTable";
import { AddProfileDialog } from "./AddProfileDialog";
import { AddViaDialog } from "./AddViaDialog";
import { AddLinkInviteDialog } from "./AddLinkInviteDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function ProfileDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProfileOpen, setIsAddProfileOpen] =
    useState(false);
  const [isAddViaOpen, setIsAddViaOpen] = useState(false);
  const [isAddLinkInviteOpen, setIsAddLinkInviteOpen] =
    useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>(
    [],
  );

  const handleRunAll = () => {
    console.log("Running all profiles");
  };

  const handleStopAll = () => {
    console.log("Stopping all profiles");
  };

  const handleRunSelected = () => {
    if (selectedRows.length > 0) {
      console.log("Running selected profiles:", selectedRows);
    }
  };

  const handleStopSelected = () => {
    if (selectedRows.length > 0) {
      console.log("Stopping selected profiles:", selectedRows);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="p-6"
        style={{
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <h2 className="text-2xl mb-4" style={{ color: "#333" }}>
          Quản lý Profile
        </h2>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button
            className="rounded-xl gap-2"
            style={{ backgroundColor: "#4F46E5" }}
            onClick={() => setIsAddProfileOpen(true)}
          >
            <UserPlus size={18} />
            Add Profile
          </Button>
          <Button
            className="rounded-xl gap-2"
            style={{ backgroundColor: "#10B981" }}
            onClick={() => setIsAddViaOpen(true)}
          >
            <Building2 size={18} />
            Add Via/BM Trung Gian
          </Button>
          <Button
            className="rounded-xl gap-2"
            style={{ backgroundColor: "#6366F1" }}
            onClick={() => setIsAddLinkInviteOpen(true)}
          >
            <LinkIcon size={18} />
            Link Invite
          </Button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <div className="mb-6">
          <h3 className="text-lg" style={{ color: "#333" }}>
            👉 Profile via / BM trung gian đã tạo
          </h3>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
              style={{ color: "#9CA3AF" }}
            />
            <Input
              placeholder="Tìm kiếm profile / via..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            style={{ borderColor: "#E5E7EB" }}
          >
            <Upload size={18} />
            Import
          </Button>
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            style={{ borderColor: "#E5E7EB" }}
          >
            <Download size={18} />
            Export
          </Button>
          <Button
            className="rounded-xl gap-2"
            style={{ backgroundColor: "#10B981" }}
            onClick={handleRunAll}
          >
            <Play size={18} />
            Run All
          </Button>
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            style={{ borderColor: "#E5E7EB", color: "#EF4444" }}
            onClick={handleStopAll}
          >
            <Square size={18} />
            Stop All
          </Button>
          <Button
            className="rounded-xl gap-2"
            style={{ backgroundColor: "#6366F1" }}
            onClick={handleRunSelected}
            disabled={selectedRows.length === 0}
          >
            <Play size={18} />
            Run Selected
          </Button>
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            style={{ borderColor: "#E5E7EB", color: "#F59E0B" }}
            onClick={handleStopSelected}
            disabled={selectedRows.length === 0}
          >
            <Square size={18} />
            Stop Selected
          </Button>
        </div>

        {/* Table */}
        <ProfileTable
          searchQuery={searchQuery}
          onSelectionChange={setSelectedRows}
        />
      </div>

      <AddProfileDialog
        open={isAddProfileOpen}
        onOpenChange={setIsAddProfileOpen}
      />
      <AddViaDialog
        open={isAddViaOpen}
        onOpenChange={setIsAddViaOpen}
      />
      <AddLinkInviteDialog
        open={isAddLinkInviteOpen}
        onOpenChange={setIsAddLinkInviteOpen}
      />
    </div>
  );
}