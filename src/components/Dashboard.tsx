import { Users, Link2, Building2, Link, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Dashboard() {
  const stats = [
    {
      title: "Total Profiles",
      value: "24",
      icon: Users,
      color: "#4F46E5",
      bgColor: "#EEF2FF",
    },
    {
      title: "Via Active",
      value: "12",
      icon: Link2,
      color: "#10B981",
      bgColor: "#D1FAE5",
    },
    {
      title: "BM Trung Gian",
      value: "8",
      icon: Building2,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
    {
      title: "Link Invites",
      value: "45",
      icon: Link,
      color: "#6366F1",
      bgColor: "#E0E7FF",
    },
    {
      title: "Running Now",
      value: "6",
      icon: Activity,
      color: "#EF4444",
      bgColor: "#FEE2E2",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6" style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
        <h2 className="text-2xl" style={{ color: "#333" }}>
          Dashboard
        </h2>
        <p className="mt-1" style={{ color: "#6B7280" }}>
          Tổng quan hệ thống BM Invite Tool
        </p>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="rounded-2xl" style={{ border: "1px solid #E5E7EB" }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm" style={{ color: "#6B7280" }}>
                    {stat.title}
                  </CardTitle>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl" style={{ color: "#333" }}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl" style={{ border: "1px solid #E5E7EB" }}>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Profile via_01 đã hoàn thành", time: "5 phút trước" },
                  { action: "BM bm_03 được thêm mới", time: "15 phút trước" },
                  { action: "Profile via_05 đã dừng", time: "30 phút trước" },
                  { action: "Link invite mới được tạo", time: "1 giờ trước" },
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span style={{ color: "#333" }}>{activity.action}</span>
                    <span style={{ color: "#9CA3AF" }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl" style={{ border: "1px solid #E5E7EB" }}>
            <CardHeader>
              <CardTitle>Trạng thái hệ thống</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "#333" }}>Profiles Running</span>
                    <span style={{ color: "#6B7280" }}>25%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: "#E5E7EB" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: "25%", backgroundColor: "#10B981" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "#333" }}>CPU Usage</span>
                    <span style={{ color: "#6B7280" }}>45%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: "#E5E7EB" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: "45%", backgroundColor: "#4F46E5" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "#333" }}>Memory Usage</span>
                    <span style={{ color: "#6B7280" }}>62%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: "#E5E7EB" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: "62%", backgroundColor: "#F59E0B" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
