"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactUsModal } from "@/components/landing/ContactUsModal";

export function DemoCta({ className = "", children = "Book a demo" }: { className?: string; children?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" className={`launch-button ${className}`} onClick={() => setOpen(true)}>
        {children}
        <ArrowUpRight size={18} aria-hidden />
      </button>
      <ContactUsModal open={open} onClose={close} />
    </>
  );
}
