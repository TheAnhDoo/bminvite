import { useState } from "react";
import { CheckCircle2, Upload, Link2, Building2 } from "lucide-react";
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

interface AddViaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddViaDialog({ open, onOpenChange }: AddViaDialogProps) {
  const [accountType, setAccountType] = useState<"via" | "bm-trung-gian">("via");
  const [accountData, setAccountData] = useState("");

  const handleSave = () => {
    console.log("Saving:", { type: accountType, data: accountData });
    onOpenChange(false);
    setAccountData("");
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Importing file:", file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setAccountData(content);
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
              style={{ backgroundColor: "#D1FAE5" }}
            >
              <Building2 size={20} style={{ color: "#10B981" }} />
            </div>
            Thêm Via / BM Trung Gian
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Account Type Selection */}
          <div className="space-y-3">
            <Label className="text-base">Chọn loại tài khoản</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAccountType("via")}
                className="p-5 rounded-xl border-2 transition-all"
                style={{
                  borderColor: accountType === "via" ? "#4F46E5" : "#E5E7EB",
                  backgroundColor: accountType === "via" ? "#EEF2FF" : "#FFFFFF",
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: accountType === "via" ? "#4F46E5" : "#F3F4F6",
                    }}
                  >
                    <Link2 size={24} style={{ color: accountType === "via" ? "#FFFFFF" : "#9CA3AF" }} />
                  </div>
                  <div>
                    <div style={{ color: accountType === "via" ? "#4F46E5" : "#333" }}>
                      Via
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                      Tài khoản Via Facebook
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setAccountType("bm-trung-gian")}
                className="p-5 rounded-xl border-2 transition-all"
                style={{
                  borderColor: accountType === "bm-trung-gian" ? "#10B981" : "#E5E7EB",
                  backgroundColor: accountType === "bm-trung-gian" ? "#D1FAE5" : "#FFFFFF",
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: accountType === "bm-trung-gian" ? "#10B981" : "#F3F4F6",
                    }}
                  >
                    <Building2 size={24} style={{ color: accountType === "bm-trung-gian" ? "#FFFFFF" : "#9CA3AF" }} />
                  </div>
                  <div>
                    <div style={{ color: accountType === "bm-trung-gian" ? "#10B981" : "#333" }}>
                      BM Trung Gian
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                      Business Manager
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg p-1" style={{ backgroundColor: "#F3F4F6" }}>
              <TabsTrigger value="manual" className="rounded-lg py-2.5">Manual Input</TabsTrigger>
              <TabsTrigger value="import" className="rounded-lg py-2.5">Import File</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-3 mt-6">
              <div className="space-y-2">
                <Label htmlFor="account-data" className="text-base">
                  Danh sách {accountType === "via" ? "Via" : "BM Trung Gian"}
                </Label>
                <Textarea
                  id="account-data"
                  placeholder="Nhập danh sách tài khoản (mỗi dòng một tài khoản)&#10;Format: UID|PASS|2FA|PROXY&#10;Proxy format: ip:port:user:pass&#10;&#10;Ví dụ:&#10;100123456789|mypassword|ABCD1234EFGH|176.111.216.68:16554:pqrc2347:LCZmcw7095"
                  value={accountData}
                  onChange={(e) => setAccountData(e.target.value)}
                  className="rounded-xl min-h-[200px] font-mono text-sm"
                  style={{ borderColor: "#E5E7EB" }}
                />
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  Mỗi dòng một tài khoản, định dạng: UID|PASS|2FA|PROXY
                </p>
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
                  Import File CSV/TXT
                </h3>
                <p className="mb-4" style={{ color: "#6B7280" }}>
                  Kéo thả file hoặc click để chọn file
                </p>
                <Input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleImportFile}
                  className="hidden"
                  id="via-file-upload"
                />
                <label htmlFor="via-file-upload">
                  <Button
                    type="button"
                    className="rounded-xl px-6 py-2.5"
                    style={{ backgroundColor: "#10B981" }}
                    onClick={() => document.getElementById("via-file-upload")?.click()}
                  >
                    Chọn File
                  </Button>
                </label>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Format File</Label>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                  <code style={{ color: "#333", fontSize: "12px" }}>
                    uid,pass,2fa,proxy
                    <br />
                    100123456789,mypassword,ABCD1234EFGH,176.111.216.68:16554:pqrc2347:LCZmcw7095
                    <br />
                    100987654321,password123,WXYZ5678IJKL,123.45.67.90:8080:user2:pass2
                  </code>
                </div>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  Hoặc format đơn giản: UID|PASS|2FA|PROXY (mỗi dòng một tài khoản)
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

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
            style={{ backgroundColor: "#10B981" }}
          >
            <CheckCircle2 size={18} className="mr-2" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
