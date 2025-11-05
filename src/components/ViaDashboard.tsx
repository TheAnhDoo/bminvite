import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";

interface Via {
  id: number;
  uid: string;
  email: string;
  proxy: string;
  createdAt: string;
}

const mockVias: Via[] = [
  {
    id: 1,
    uid: "100123",
    email: "via1@example.com",
    proxy: "176.111.216.68:16554:pqrc2347:LCZmcw7095",
    createdAt: "2025-11-05 10:00:00",
  },
  {
    id: 2,
    uid: "100124",
    email: "via2@example.com",
    proxy: "123.45.67.90:8080:user2:pass2",
    createdAt: "2025-11-05 10:15:00",
  },
];

export function ViaDashboard() {
  const [vias, setVias] = useState<Via[]>(mockVias);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredVias = vias.filter(
    (via) =>
      via.uid.includes(searchQuery) ||
      via.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    setVias(vias.filter((via) => !selectedIds.includes(via.id)));
    setSelectedIds([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6" style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
        <h2 className="text-2xl" style={{ color: "#333" }}>
          Quản lý Via
        </h2>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
            <Input
              placeholder="Tìm kiếm via..."
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
                <TableHead>UID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Proxy</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVias.map((via) => (
                <TableRow key={via.id} style={{ borderColor: "#E5E7EB" }}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(via.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds([...selectedIds, via.id]);
                        } else {
                          setSelectedIds(selectedIds.filter((id) => id !== via.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{via.uid}</TableCell>
                  <TableCell>{via.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{via.proxy}</TableCell>
                  <TableCell style={{ color: "#6B7280" }}>{via.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
