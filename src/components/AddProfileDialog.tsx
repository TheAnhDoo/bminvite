import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface AddProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddProfileDialog({ open, onOpenChange }: AddProfileDialogProps) {
  const [proxyIP, setProxyIP] = useState("");
  const [proxyPort, setProxyPort] = useState("");
  const [proxyUser, setProxyUser] = useState("");
  const [proxyPass, setProxyPass] = useState("");
  const [uidPassTwoFa, setUidPassTwoFa] = useState("");
  const [fingerprint, setFingerprint] = useState("random");
  const [testingProxy, setTestingProxy] = useState(false);

  const handleTestProxy = () => {
    setTestingProxy(true);
    setTimeout(() => {
      setTestingProxy(false);
      alert("Proxy test successful!");
    }, 1500);
  };

  const handleSave = () => {
    console.log("Saving profile:", {
      proxy: { ip: proxyIP, port: proxyPort, user: proxyUser, pass: proxyPass },
      uidPassTwoFa,
      fingerprint,
    });
    onOpenChange(false);
    resetForm();
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Importing CSV:", file.name);
      // Handle CSV import logic
    }
  };

  const resetForm = () => {
    setProxyIP("");
    setProxyPort("");
    setProxyUser("");
    setProxyPass("");
    setUidPassTwoFa("");
    setFingerprint("random");
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
              <CheckCircle2 size={20} style={{ color: "#4F46E5" }} />
            </div>
            Thêm Profile
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-lg p-1" style={{ backgroundColor: "#F3F4F6" }}>
            <TabsTrigger value="manual" className="rounded-lg py-2.5">Manual Input</TabsTrigger>
            <TabsTrigger value="import" className="rounded-lg py-2.5">Import CSV/TXT</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-5 mt-6">
            {/* Proxy Section */}
            <div className="space-y-3">
              <Label className="text-base">Proxy Configuration</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proxy-ip" className="text-sm">IP Address</Label>
                  <Input
                    id="proxy-ip"
                    placeholder="123.45.67.89"
                    value={proxyIP}
                    onChange={(e) => setProxyIP(e.target.value)}
                    className="rounded-xl h-11"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxy-port" className="text-sm">Port</Label>
                  <Input
                    id="proxy-port"
                    placeholder="8080"
                    value={proxyPort}
                    onChange={(e) => setProxyPort(e.target.value)}
                    className="rounded-xl h-11"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxy-user" className="text-sm">Username</Label>
                  <Input
                    id="proxy-user"
                    placeholder="username"
                    value={proxyUser}
                    onChange={(e) => setProxyUser(e.target.value)}
                    className="rounded-xl h-11"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxy-pass" className="text-sm">Password</Label>
                  <div className="flex gap-2">
                    <Input
                      id="proxy-pass"
                      type="password"
                      placeholder="••••••••"
                      value={proxyPass}
                      onChange={(e) => setProxyPass(e.target.value)}
                      className="rounded-xl flex-1 h-11"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl px-5"
                      onClick={handleTestProxy}
                      disabled={testingProxy || !proxyIP || !proxyPort}
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      {testingProxy ? "Testing..." : "Test"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fingerprint Configuration */}
            <div className="space-y-2">
              <Label htmlFor="fingerprint" className="text-base">Fingerprint Configuration</Label>
              <Select value={fingerprint} onValueChange={setFingerprint}>
                <SelectTrigger className="rounded-xl h-11" style={{ borderColor: "#E5E7EB" }}>
                  <SelectValue placeholder="Chọn cấu hình fingerprint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random Fingerprint</SelectItem>
                  <SelectItem value="chrome-windows">Chrome - Windows</SelectItem>
                  <SelectItem value="chrome-macos">Chrome - MacOS</SelectItem>
                  <SelectItem value="firefox-windows">Firefox - Windows</SelectItem>
                  <SelectItem value="edge-windows">Edge - Windows</SelectItem>
                  <SelectItem value="custom">Custom Configuration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* UID|PASS|2FA|PROXY */}
            <div className="space-y-2">
              <Label htmlFor="uid-pass-2fa" className="text-base">
                UID|PASS|2FA|PROXY 
                <span style={{ color: "#9CA3AF" }}> (Không bắt buộc)</span>
              </Label>
              <Textarea
                id="uid-pass-2fa"
                placeholder="Format: UID|PASS|2FA|PROXY&#10;Ví dụ: 100123456789|mypassword|ABCD1234EFGH5678|176.111.216.68:16554:pqrc2347:LCZmcw7095"
                value={uidPassTwoFa}
                onChange={(e) => setUidPassTwoFa(e.target.value)}
                className="rounded-xl min-h-[120px] font-mono text-sm"
                style={{ borderColor: "#E5E7EB" }}
              />
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Mỗi dòng một tài khoản, định dạng: UID|PASS|2FA|PROXY (Proxy format: ip:port:user:pass)
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
                onChange={handleImportCSV}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  type="button"
                  className="rounded-xl px-6 py-2.5"
                  style={{ backgroundColor: "#4F46E5" }}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Chọn File
                </Button>
              </label>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Format CSV/TXT</Label>
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                <code style={{ color: "#333", fontSize: "12px" }}>
                  uid,pass,2fa,proxy_ip,proxy_port,proxy_user,proxy_pass
                  <br />
                  100123,mypass,ABC123,176.111.216.68,16554,pqrc2347,LCZmcw7095
                  <br />
                  100124,mypass2,DEF456,123.45.67.90,8080,user2,pass2
                </code>
              </div>
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Hoặc format đơn giản: uid|pass|2fa|proxy (proxy format: ip:port:user:pass)
              </p>
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
            style={{ backgroundColor: "#4F46E5" }}
          >
            <CheckCircle2 size={18} className="mr-2" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AddProfileDialog };
