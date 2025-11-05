import { useState, useEffect, useMemo } from "react";
import { Play, Square, Edit2, Trash2, Eye, Pin } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { StatusBadge } from "./StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Profile {
  id: number;
  viaOrBmId: string;
  type: "via" | "bm-trung-gian";
  proxy: string;
  uid: string;
  status: "running" | "stopped" | "error";
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    viaOrBmId: "bm_01",
    type: "bm-trung-gian",
    proxy: "123.45.67.89",
    uid: "100123",
    status: "running",
  },
  {
    id: 2,
    viaOrBmId: "bm_02",
    type: "bm-trung-gian",
    proxy: "123.45.67.90",
    uid: "100124",
    status: "stopped",
  },
  {
    id: 3,
    viaOrBmId: "via_01",
    type: "via",
    proxy: "123.45.67.91",
    uid: "100125",
    status: "error",
  },
  {
    id: 4,
    viaOrBmId: "via_02",
    type: "via",
    proxy: "123.45.67.92",
    uid: "100126",
    status: "running",
  },
  {
    id: 5,
    viaOrBmId: "bm_03",
    type: "bm-trung-gian",
    proxy: "123.45.67.93",
    uid: "100127",
    status: "stopped",
  },
  {
    id: 6,
    viaOrBmId: "via_03",
    type: "via",
    proxy: "123.45.67.94",
    uid: "100128",
    status: "running",
  },
];

interface ProfileTableProps {
  searchQuery: string;
  onSelectionChange: (selected: number[]) => void;
}

export function ProfileTable({ searchQuery, onSelectionChange }: ProfileTableProps) {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Sort profiles: BM Trung Gian first, then Via
  const sortedProfiles = useMemo(() => {
    return [...profiles].sort((a, b) => {
      if (a.type === "bm-trung-gian" && b.type === "via") return -1;
      if (a.type === "via" && b.type === "bm-trung-gian") return 1;
      return 0;
    });
  }, [profiles]);

  const filteredProfiles = sortedProfiles.filter(
    (profile) =>
      profile.viaOrBmId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.uid.includes(searchQuery) ||
      profile.proxy.includes(searchQuery)
  );

  useEffect(() => {
    onSelectionChange(selectedIds);
  }, [selectedIds, onSelectionChange]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredProfiles.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setProfiles(
      profiles.map((profile) => {
        if (profile.id === id) {
          return {
            ...profile,
            status: profile.status === "running" ? "stopped" : "running",
          };
        }
        return profile;
      })
    );
  };

  const handleDelete = (id: number) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
      <Table>
        <TableHeader>
          <TableRow style={{ borderColor: "#E5E7EB" }}>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.length === filteredProfiles.length && filteredProfiles.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Via/BM Trung Gian ID</TableHead>
            <TableHead>Proxy</TableHead>
            <TableHead>UID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProfiles.map((profile) => (
            <TableRow
              key={profile.id}
              style={{ 
                borderColor: "#E5E7EB",
                backgroundColor: profile.type === "bm-trung-gian" ? "#F9FAFB" : "#FFFFFF"
              }}
              onMouseEnter={() => setHoveredRow(profile.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(profile.id)}
                  onCheckedChange={(checked) => handleSelectRow(profile.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>{profile.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {profile.type === "bm-trung-gian" && (
                    <Pin size={14} style={{ color: "#4F46E5" }} />
                  )}
                  <span>{profile.viaOrBmId}</span>
                  {profile.type === "bm-trung-gian" && (
                    <span
                      className="px-2 py-0.5 rounded-md text-xs"
                      style={{ backgroundColor: "#EEF2FF", color: "#4F46E5" }}
                    >
                      BM
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{profile.proxy}</TableCell>
              <TableCell>{profile.uid}</TableCell>
              <TableCell>
                <StatusBadge status={profile.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {profile.status === "running" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg h-8 px-3"
                      onClick={() => handleToggleStatus(profile.id)}
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <Square size={14} />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-lg h-8 px-3"
                      onClick={() => handleToggleStatus(profile.id)}
                      style={{ backgroundColor: "#10B981" }}
                    >
                      <Play size={14} />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg h-8 px-3"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg h-8 px-3"
                    onClick={() => handleDelete(profile.id)}
                    style={{ borderColor: "#E5E7EB", color: "#EF4444" }}
                  >
                    <Trash2 size={14} />
                  </Button>
                  {hoveredRow === profile.id && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg h-8 px-3"
                      style={{ borderColor: "#4F46E5", color: "#4F46E5" }}
                    >
                      <Eye size={14} />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
