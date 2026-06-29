"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { CheckCircle2, AlertCircle, Info, X, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContext = createContext(null);

const TONES = {
  success: { icon: CheckCircle2, cls: "text-admin-success", bar: "bg-admin-success" },
  error: { icon: AlertCircle, cls: "text-admin-danger", bar: "bg-admin-danger" },
  warning: { icon: TriangleAlert, cls: "text-admin-warning", bar: "bg-admin-warning" },
  info: { icon: Info, cls: "text-admin-info", bar: "bg-admin-info" },
};

let counter = 0;

/** App-wide toast notifications. Use the `useToast()` hook to push. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (toast) => {
      const id = ++counter;
      const entry = {
        id,
        tone: toast.tone || "info",
        title: toast.title,
        description: toast.description,
        duration: toast.duration ?? 4500,
      };
      setToasts((list) => [...list, entry]);
      if (entry.duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), entry.duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  const toast = {
    show: push,
    success: (title, description) => push({ tone: "success", title, description }),
    error: (title, description) => push({ tone: "error", title, description }),
    warning: (title, description) => push({ tone: "warning", title, description }),
    info: (title, description) => push({ tone: "info", title, description }),
    dismiss,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const tone = TONES[t.tone] ?? TONES.info;
          const Icon = tone.icon;
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex items-start gap-3 overflow-hidden rounded-xl border border-admin-border bg-admin-elevated p-3.5 admin-shadow"
            >
              <span className={cn("mt-0.5 shrink-0", tone.cls)}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                {t.title && (
                  <p className="text-sm font-semibold text-admin-fg">{t.title}</p>
                )}
                {t.description && (
                  <p className="mt-0.5 text-sm text-admin-fg-muted">{t.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-md p-1 text-admin-fg-subtle transition-colors hover:bg-admin-surface-2 hover:text-admin-fg"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
