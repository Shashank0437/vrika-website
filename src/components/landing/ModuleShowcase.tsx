"use client";

import { useState } from "react";
import type { PlatformModule } from "@/components/landing/landing-data";
import { DemoVideo } from "@/components/stitch/DemoVideo";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";

const GOVERNANCE_HIGHLIGHTS = [
  { icon: "apartment", label: "Multi-tenant isolation" },
  { icon: "admin_panel_settings", label: "Role-based access" },
  { icon: "how_to_reg", label: "Approval gates" },
  { icon: "history", label: "Full audit trails" },
  { icon: "vpn_key", label: "SSO / SAML" },
  { icon: "dns", label: "Cloud or on-premise" },
] as const;

/** Interactive tabbed explorer for the four platform modules. */
export function ModuleShowcase({ modules }: { modules: PlatformModule[] }) {
  const [active, setActive] = useState(0);
  const mod = modules[active];

  return (
    <div>
      {/* Tab rail */}
      <div
        role="tablist"
        aria-label="Platform modules"
        className="grid gap-px overflow-hidden rounded-xl border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-4"
      >
        {modules.map((m, i) => {
          const selected = i === active;
          return (
            <button
              key={m.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`vk-sweep group relative flex flex-col items-start gap-3 p-6 text-left transition-colors ${
                selected ? "bg-surface-container" : "bg-surface-container-lowest hover:bg-surface-container/60"
              }`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-primary transition-transform duration-500 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <div className="flex w-full items-center justify-between">
                <span
                  className={`inline-flex size-11 items-center justify-center rounded-lg border transition-colors ${
                    selected ? "border-primary/40 bg-primary/10" : "border-outline-variant bg-surface-container"
                  }`}
                >
                  <MaterialSymbol name={m.icon} className="text-xl text-primary" />
                </span>
                <span className="cyber-index text-outline-variant">/{String(i + 1).padStart(2, "0")}</span>
              </div>
              <span
                className={`text-[0.9375rem] font-bold leading-snug tracking-tight transition-colors ${
                  selected ? "text-primary" : "text-on-surface"
                }`}
              >
                {m.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div key={mod.id} role="tabpanel" className="agentic-stream-chunk mt-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-md border border-primary/25 bg-primary/[0.07] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                {mod.index}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-primary/35 to-transparent" />
            </div>
            <h3 className="mt-6 text-3xl font-bold tracking-tight text-on-surface md:text-[2.4rem] md:leading-[1.15]">
              {mod.headline}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-on-surface-variant">{mod.body}</p>
          </div>

          <div>
            {mod.videoSrc ? (
              <div className="group relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 blur-2xl transition duration-700 group-hover:opacity-100" />
                <div className="cyber-brackets cyber-brackets-static relative overflow-hidden rounded-xl border border-outline-variant">
                  <DemoVideo src={mod.videoSrc} />
                </div>
              </div>
            ) : (
              <div className="cyber-grid relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-7">
                <div className="relative grid gap-3 sm:grid-cols-2">
                  {GOVERNANCE_HIGHLIGHTS.map((item, i) => (
                    <div
                      key={item.label}
                      className="vk-pop flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3.5 transition-colors hover:border-primary/40"
                      style={{ ["--vk-delay" as string]: `${i * 60}ms` }}
                    >
                      <MaterialSymbol name={item.icon} className="text-xl text-primary" />
                      <span className="text-sm font-semibold text-on-surface">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="cyber-rule mt-16" />

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-4">
          {mod.features.map((feature) => (
            <article
              key={feature.title}
              className="group bg-surface-container-lowest p-6 transition-colors hover:bg-surface-container"
            >
              <div className="flex items-start gap-2.5">
                <MaterialSymbol
                  name="chevron_right"
                  className="mt-0.5 shrink-0 text-lg text-primary transition-transform group-hover:translate-x-0.5"
                />
                <h4 className="text-[0.9375rem] font-bold leading-snug tracking-tight text-on-surface">
                  {feature.title}
                </h4>
              </div>
              <p className="mt-2.5 pl-[1.65rem] text-sm leading-relaxed text-on-surface-variant">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
