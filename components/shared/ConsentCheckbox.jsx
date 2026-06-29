"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const agreements = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Risk Disclosure", href: "#" },
  { label: "Disclaimer", href: "#" },
];

/**
 * Legal-consent checkbox shown before a sign-in / sign-up action.
 *
 * Controlled when `checked` + `onChange` are passed; otherwise it manages
 * its own state. Wire `checked` into a form's submit-disabled logic.
 */
export function ConsentCheckbox({ checked, onChange, className }) {
  const id = useId();
  const [internal, setInternal] = useState(false);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;

  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-2",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line text-primary accent-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />
      <span>
        I have read and agree to the{" "}
        {agreements.map((a, i) => (
          <span key={a.label}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-[#155730] hover:decoration-primary"
            >
              {a.label}
            </a>
            {i < agreements.length - 2 ? ", " : null}
            {i === agreements.length - 2 ? ", and " : null}
            {i === agreements.length - 1 ? "." : null}
          </span>
        ))}
      </span>
    </label>
  );
}
