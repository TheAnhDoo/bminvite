import { useState } from "react";
import { Plus, Search, Trash2, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";

interface LinkInvite {
  id: number;
  link: string;
  notes: string;
  createdAt: string;
}

const mockLinks: LinkInvite[] = [
  {
    id: 1,
    link: "https://facebook.com/invite/abc123",
    notes: "Campaign tháng 11",
    createdAt: "2025-11-05 08:00:00",
  },
  {
    id: 2,
    link: "https://facebook.com/invite/xyz456",
    notes: "Test campaign",
    createdAt: "2025-11-05 08:30:00",
  },
];

export function LinkInviteDashboard() {
  const [links, setLinks] = useState<LinkInvite[]>(mockLinks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredLinks = links.filter(
    (link) =>
      link.link.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    setLinks(links.filter((link) => !selectedIds.includes(link.id)));
    setSelectedIds([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6" style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
        <h2 className="text-2xl" style={{ color: "#333" }}>
          Quản lý Link Invite
        </h2>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
            <Input
              placeholder="Tìm kiếm link invite..."
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
                <TableHead>Link</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLinks.map((link) => (
                <TableRow key={link.id} style={{ borderColor: "#E5E7EB" }}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(link.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds([...selectedIds, link.id]);
                        } else {
                          setSelectedIds(selectedIds.filter((id) => id !== link.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                      style={{ color: "#4F46E5" }}
                    >
                      {link.link}
                      <ExternalLink size={14} />
                    </a>
                  </TableCell>
                  <TableCell>{link.notes}</TableCell>
                  <TableCell style={{ color: "#6B7280" }}>{link.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
