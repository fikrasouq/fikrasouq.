"use client";

import { useState } from "react";
import { Toast } from "@/components/ui/toast";

export function AdminActionButton({
  label,
  className,
  successMessage,
}: {
  label: string;
  className: string;
  successMessage: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => {
          setIsSubmitting(true);
          window.setTimeout(() => {
            setIsSubmitting(false);
            setToastOpen(true);
          }, 250);
        }}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isSubmitting ? "جارٍ التنفيذ..." : label}
      </button>

      {toastOpen ? (
        <Toast
          tone="success"
          title="تم تنفيذ الإجراء"
          message={successMessage}
          onClose={() => setToastOpen(false)}
        />
      ) : null}
    </>
  );
}
