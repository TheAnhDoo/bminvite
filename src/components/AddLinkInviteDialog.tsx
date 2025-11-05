import { useState } from "react";
import { CheckCircle2, Link as LinkIcon, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface AddLinkInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLinkInviteDialog({ open, onOpenChange }: AddLinkInviteDialogProps) {
  const [inviteLinks, setInviteLinks] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("Saving invite links:", { inviteLinks, notes });
    onOpenChange(false);
    setInviteLinks("");
    setNotes("");
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Importing file:", file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInviteLinks(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl rounded-2xl max-h-[90vh] overflow-y-auto" style={{ border: "1px solid #E5E7EB" }}>
        <DialogHeader className="pb-3">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              <LinkIcon size={20} style={{ color: "#6366F1" }} />
            </div>
            Thêm Link Invite
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-lg p-1" style={{ backgroundColor: "#F3F4F6" }}>
            <TabsTrigger value="manual" className="rounded-lg py-2.5">Manual Input</TabsTrigger>
            <TabsTrigger value="import" className="rounded-lg py-2.5">Import File</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-5 mt-6">
            <div className="space-y-2">
              <Label htmlFor="invite-links" className="text-base">Danh sách Link Invite</Label>
              <Textarea
                id="invite-links"
                placeholder="Nhập danh sách link invite (mỗi dòng một link)&#10;Ví dụ:&#10;https://facebook.com/invite/abc123&#10;https://facebook.com/invite/def456"
                value={inviteLinks}
                onChange={(e) => setInviteLinks(e.target.value)}
                className="rounded-xl min-h-[180px]"
                style={{ borderColor: "#E5E7EB" }}
              />
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Mỗi dòng một link invite
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">Ghi chú (Không bắt buộc)</Label>
              <Textarea
                id="notes"
                placeholder="Thêm ghi chú về campaign, mục đích sử dụng..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-xl min-h-[100px]"
                style={{ borderColor: "#E5E7EB" }}
              />
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-5 mt-6">
            <div className="border-2 border-dashed rounded-2xl p-12 text-center" style={{ borderColor: "#E5E7EB" }}>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Upload size={28} style={{ color: "#6B7280" }} />
              </div>
              <h3 className="mb-2" style={{ color: "#333" }}>
                Import File TXT
              </h3>
              <p className="mb-4" style={{ color: "#6B7280" }}>
                Kéo thả file hoặc click để chọn file
              </p>
              <Input
                type="file"
                accept=".txt"
                onChange={handleImportFile}
                className="hidden"
                id="link-file-upload"
              />
              <label htmlFor="link-file-upload">
                <Button
                  type="button"
                  className="rounded-xl px-6 py-2.5"
                  style={{ backgroundColor: "#6366F1" }}
                  onClick={() => document.getElementById("link-file-upload")?.click()}
                >
                  Chọn File
                </Button>
              </label>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Format File</Label>
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                <code style={{ color: "#333", fontSize: "12px" }}>
                  https://facebook.com/invite/abc123
                  <br />
                  https://facebook.com/invite/def456
                  <br />
                  https://facebook.com/invite/ghi789
                </code>
              </div>
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Mỗi dòng một link invite
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes-import" className="text-base">Ghi chú (Không bắt buộc)</Label>
              <Textarea
                id="notes-import"
                placeholder="Thêm ghi chú chung cho tất cả link..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-xl min-h-[100px]"
                style={{ borderColor: "#E5E7EB" }}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-5 py-2"
            style={{ borderColor: "#E5E7EB" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl px-5 py-2"
            style={{ backgroundColor: "#6366F1" }}
          >
            <CheckCircle2 size={18} className="mr-2" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
