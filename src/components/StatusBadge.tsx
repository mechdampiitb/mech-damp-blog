import React from "react";
import { SubmissionStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: SubmissionStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const configs: Record<SubmissionStatus, { label: string; className: string }> = {
    submitted: {
      label: "Submitted",
      className: "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]",
    },
    under_review: {
      label: "Under Review",
      className: "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]",
    },
    approved: {
      label: "Approved",
      className: "bg-[var(--text)] text-[var(--bg)] border-transparent",
    },
    rejected: {
      label: "Rejected",
      className: "bg-transparent text-[var(--text-muted)] border-[var(--border)] line-through",
    },
    changes_requested: {
      label: "Revision",
      className: "bg-transparent text-[var(--text)] border-[var(--text-muted)] border-dashed",
    },
  };

  const config = configs[status] || {
    label: status,
    className: "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
