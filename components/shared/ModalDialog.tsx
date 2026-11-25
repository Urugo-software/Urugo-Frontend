"use client";

import type { ReactNode } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: "dialog" | "alert";
  maxWidthClassName?: string;
  disableClose?: boolean;
}

export function ModalDialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = "dialog",
  maxWidthClassName = "max-w-lg",
  disableClose = false,
}: ModalDialogProps) {
  const Root = variant === "alert" ? AlertDialog.Root : Dialog.Root;
  const Portal = variant === "alert" ? AlertDialog.Portal : Dialog.Portal;
  const Backdrop = variant === "alert" ? AlertDialog.Backdrop : Dialog.Backdrop;
  const Popup = variant === "alert" ? AlertDialog.Popup : Dialog.Popup;
  const Title = variant === "alert" ? AlertDialog.Title : Dialog.Title;
  const Description =
    variant === "alert" ? AlertDialog.Description : Dialog.Description;

  return (
    <Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !disableClose) onClose();
      }}
    >
      <Portal>
        <Backdrop className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px]" />
        <Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col border border-line bg-white shadow-xl outline-none",
            maxWidthClassName,
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
            <div className="min-w-0">
              <Title className="text-base font-bold text-ink">{title}</Title>
              {description && (
                <Description className="mt-1 text-xs leading-relaxed text-body">
                  {description}
                </Description>
              )}
            </div>
            {!disableClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center text-faint transition-colors hover:bg-surface hover:text-ink"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {children}
          </div>

          {footer && (
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line bg-surface/40 px-5 py-3.5">
              {footer}
            </div>
          )}
        </Popup>
      </Portal>
    </Root>
  );
}
