interface StatusBadgeProps {
  status: "running" | "stopped" | "error";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    running: {
      label: "Running",
      color: "#10B981",
      bgColor: "#D1FAE5",
    },
    stopped: {
      label: "Stopped",
      color: "#EF4444",
      bgColor: "#FEE2E2",
    },
    error: {
      label: "Error",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      <span style={{ color: config.color }}>{config.label}</span>
    </div>
  );
}
