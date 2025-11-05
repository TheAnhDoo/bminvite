import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";

interface BMTrungGian {
  id: number;
  bmId: string;
  bmName: string;
  createdAt: string;
}

const mockBMs: BMTrungGian[] = [
  {
    id: 1,
    bmId: "bm_001",
    bmName: "BM Account 1",
    createdAt: "2025-11-05 09:00:00",
  },
  {
    id: 2,
    bmId: "bm_002",
    bmName: "BM Account 2",
    createdAt: "2025-11-05 09:30:00",
  },
];

export function BMTrungGianDashboard() {
  const [bms, setBMs] = useState<BMTrungGian[]>(mockBMs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredBMs = bms.filter(
    (bm) =>
      bm.bmId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.bmName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    setBMs(bms.filter((bm) => !selectedIds.includes(bm.id)));
    setSelectedIds([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6" style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
        <h2 className="text-2xl" style={{ color: "#333" }}>
          Quản lý BM Trung Gian
        </h2>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
            <Input
              placeholder="Tìm kiếm BM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
            style={{ borderColor: "#E5E7EB", color: "#EF4444" }}
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "#E5E7EB" }}>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>BM ID</TableHead>
                <TableHead>BM Name</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBMs.map((bm) => (
                <TableRow key={bm.id} style={{ borderColor: "#E5E7EB" }}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(bm.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds([...selectedIds, bm.id]);
                        } else {
                          setSelectedIds(selectedIds.filter((id) => id !== bm.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{bm.bmId}</TableCell>
                  <TableCell>{bm.bmName}</TableCell>
                  <TableCell style={{ color: "#6B7280" }}>{bm.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
