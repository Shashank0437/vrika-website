import { Icon } from "@iconify/react";
import {
  BRAND_TAGLINE,
  BUSINESS_BENEFITS,
  CLOUD_ENVIRONMENTS,
  COMPLIANCE_FRAMEWORKS,
  CUSTOMIZATION_FEATURES,
  DIFFERENTIATORS,
  FAQ_ITEMS,
  HERO,
  KEY_CAPABILITIES,
  PLATFORM_MODULES,
  TOOL_CATEGORIES,
  TOOL_MARQUEE,
  USE_CASES,
} from "@/components/landing/landing-data";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import { ModuleShowcase } from "@/components/landing/ModuleShowcase";
import { DemoCta } from "@/components/landing/DemoCta";
import { SecurityShowcase } from "@/components/landing/SecurityShowcase";
import { AttackPathGraph } from "@/components/motion/AttackPathGraph";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { WordReveal } from "@/components/motion/WordReveal";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";

/** Drifting gradient mesh used behind hero-style sections. */
function MeshBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="vk-mesh-a absolute -left-1/4 top-[-30%] size-[70vw] max-w-[820px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_65%)] blur-3xl" />
      <div className="vk-mesh-b absolute -right-1/5 top-[-10%] size-[60vw] max-w-[720px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#8b5cf6_18%,transparent),transparent_65%)] blur-3xl" />
      <div className="vk-mesh-a absolute bottom-[-40%] left-1/3 size-[55vw] max-w-[680px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-tertiary)_10%,transparent),transparent_65%)] blur-3xl" />
    </div>
  );
}

function SectionHeading({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <p className="cyber-kicker justify-center">{kicker}</p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-on-surface md:text-[2.6rem] md:leading-[1.15]">
          {title}
        </h2>
      </Reveal>
      {body ? (
        <Reveal delay={170}>
          <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">{body}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

function ToolMarqueeRow({ rowKey }: { rowKey: string }) {
  return (
    <>
      {TOOL_MARQUEE.map((label) => (
        <div
          key={`${rowKey}-${label}`}
          className="vk-sweep flex shrink-0 cursor-default items-center gap-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_10px_24px_-14px_var(--color-primary)]"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="font-mono text-xs font-bold tracking-[0.12em] text-on-surface">{label}</span>
        </div>
      ))}
    </>
  );
}

const pad2 = (n: number) => String(n + 1).padStart(2, "0");

export function VrikaLandingPage() {
  return (
    <div className="launch-site bg-background font-sans text-on-background antialiased selection:bg-primary selection:text-on-primary">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <LandingNav />

      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="launch-hero relative isolate overflow-hidden">
          <MeshBackdrop />
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-60" />

          <div className="hero-layout relative z-10 mx-auto grid max-w-7xl items-center px-6">
            <div className="space-y-7">
              <Reveal>
                <p className="hero-eyebrow">
                  <span className="cyber-pulse size-1.5 rounded-full bg-tertiary" />
                  <span>
                    {HERO.eyebrow}
                  </span>
                </p>
              </Reveal>

              <h1 className="hero-title">
                <WordReveal text={HERO.title} delay={120} />
                <br />
                <WordReveal
                  text={HERO.titleAccent}
                  delay={120 + HERO.title.split(" ").length * 70}
                  className="vk-gradient-animate bg-gradient-to-r from-primary via-[#8b5cf6] to-primary bg-clip-text text-transparent"
                />
              </h1>

              <Reveal delay={420}>
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-14 w-px shrink-0 bg-gradient-to-b from-primary/60 to-transparent" />
                  <p className="max-w-xl text-[1.0625rem] leading-relaxed text-on-surface-variant">{HERO.body}</p>
                </div>
              </Reveal>

              <Reveal delay={510}>
                <div className="flex flex-wrap gap-3 pt-1">
                  <DemoCta />
                  <a
                    href="#platform"
                    className="launch-button launch-button-secondary group"
                  >
                    Explore the platform
                    <MaterialSymbol
                      name="arrow_forward"
                      className="text-lg transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={600}>
                <div className="hero-assurances">
                  <span><MaterialSymbol name="verified_user" />Human-in-the-loop</span>
                  <span><MaterialSymbol name="dns" />Cloud or on-premise</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={240} variant="scale" className="min-w-0">
              <SecurityShowcase />
            </Reveal>
          </div>

          {/* Stat band */}
          <div className="relative z-10 border-t border-outline-variant bg-surface-container-lowest/70 backdrop-blur-sm">
            <dl className="hero-stats mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4">
              {HERO.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 110} className="group px-6 py-7 text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <CountUp
                        value={stat.value}
                        className="block bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-[2.25rem] font-black leading-none text-transparent transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="mt-2.5 block text-xs font-medium text-on-surface-variant">
                        {stat.label}
                      </span>
                    </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <div className="platform-ribbon" aria-label="Supported environments">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-9 gap-y-5 px-6">
            <p>Built for your environment</p>
            {["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Microsoft 365", "GitHub"].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>

        {/* Why VRIKA */}
        <section id="why-vrika" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-background py-24">
          <div className="cyber-dots cyber-grid-fade pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Why VRIKA"
              title="What makes VRIKA different"
              body="VRIKA's AI-powered security agents continuously identify, validate, and prioritize security risks by orchestrating real-world attack simulations across your environment — helping security teams discover vulnerabilities before attackers do."
            />
            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {DIFFERENTIATORS.map((item, i) => (
                <Reveal key={item.title} delay={i * 130}>
                  <SpotlightCard tilt={2} className="differentiator-card h-full rounded-2xl border border-outline-variant bg-surface-container-lowest p-8">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.07]">
                        <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                      </div>
                      <span className="differentiator-number" aria-hidden>{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-tight text-on-surface">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-on-surface-variant">{item.body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>

            {/* Attack path feature */}
            <Reveal delay={120}>
              <div className="attack-feature mt-10 grid items-center gap-10 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low p-6 shadow-sm md:p-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
                <div>
                  <p className="cyber-kicker">See the bigger picture</p>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                    See how a small gap could put your data at risk
                  </h3>
                  <p className="mt-4 leading-relaxed text-on-surface-variant">
                    Security issues rarely exist in isolation. VRIKA connects the dots between your applications,
                    access permissions, and important information — helping your team understand what matters
                    and where to act first.
                  </p>
                  <a href="#module-cloud" className="editorial-link">
                    Explore cloud security <MaterialSymbol name="arrow_forward" />
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent_70%)]" />
                  <AttackPathGraph className="relative w-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Platform at a glance */}
        <section id="platform" className="vk-noise relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-24">
          <MeshBackdrop />
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="The platform"
              title="Four integrated modules, one platform"
              body="VRIKA unifies conversational assessment, autonomous tool orchestration, cloud posture management, and enterprise governance into a single offensive security platform."
            />
            <div className="mt-16">
              <ModuleShowcase modules={PLATFORM_MODULES} />
            </div>
          </div>
        </section>

        {/* Key capabilities */}
        <section id="capabilities" className="relative scroll-mt-28 border-b border-outline-variant bg-background py-24">
          <div className="editorial-layout relative mx-auto max-w-7xl px-6">
            <Reveal className="editorial-heading">
              <p className="cyber-kicker">Core capabilities</p>
              <h2>Built for how offensive security actually works</h2>
              <p className="editorial-note">{BRAND_TAGLINE}</p>
              <a href="#platform" className="editorial-link">Meet the platform <MaterialSymbol name="arrow_forward" /></a>
              <div className="editorial-seal" aria-hidden><MaterialSymbol name="fingerprint" /></div>
            </Reveal>
            <div className="capability-list">
              {KEY_CAPABILITIES.map((item, i) => (
                <Reveal key={item.title} delay={i * 110}>
                  <SpotlightCard
                    tilt={0}
                    className="capability-row group"
                  >
                    <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.07] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold tracking-tight text-on-surface">{item.title}</h3>
                        <span className="cyber-index text-outline">/{pad2(i)}</span>
                      </div>
                      <p className="mt-2 leading-relaxed text-on-surface-variant">{item.body}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tool coverage */}
        <section id="tool-coverage" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-24">
          <div className="cyber-dots cyber-grid-fade pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Tool coverage"
              title="185+ security tools, orchestrated"
              body="VRIKA's orchestration engine manages an arsenal spanning ten offensive tooling categories — selected and chained automatically based on live results."
            />
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {TOOL_CATEGORIES.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <SpotlightCard
                    tilt={6}
                    className="flex h-full flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-on-surface">{item.title}</h3>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative mt-16 space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track flex w-max gap-3">
              <ToolMarqueeRow rowKey="a" />
              <ToolMarqueeRow rowKey="b" />
            </div>
            <div className="marquee-track-reverse flex w-max gap-3">
              <ToolMarqueeRow rowKey="c" />
              <ToolMarqueeRow rowKey="d" />
            </div>
          </div>
        </section>

        {/* Cloud coverage */}
        <section id="cloud-coverage" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-background py-24">
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Cloud coverage"
              title="Continuous posture across every major cloud"
              body="Assess AWS, Azure, Google Cloud, Kubernetes, Microsoft 365, and source control from a single console — with hundreds of best-practice checks."
            />
            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CLOUD_ENVIRONMENTS.map((env, i) => (
                <Reveal key={env.name} delay={i * 90}>
                  <SpotlightCard className="group h-full rounded-xl border border-outline-variant bg-surface-container-lowest p-7 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Icon
                        icon={env.icon}
                        className="size-9 text-on-surface transition-all duration-500 group-hover:scale-110 group-hover:text-primary"
                      />
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">{env.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{env.body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="vk-noise relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-20">
          <MeshBackdrop />
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <p className="cyber-kicker justify-center">Compliance mapping</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                Out-of-the-box framework coverage
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {COMPLIANCE_FRAMEWORKS.map((name, i) => (
                <Reveal key={name} delay={i * 70} variant="scale">
                  <span className="vk-pop inline-flex items-center gap-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-6 py-3 font-mono text-sm font-bold tracking-[0.1em] text-on-surface shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:shadow-[0_12px_28px_-16px_var(--color-primary)]">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {name}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={560}>
              <p className="mt-8 text-on-surface-variant">
                Continuous mapping to major frameworks streamlines audits and evidence collection.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Business value */}
        <section id="business-value" className="relative scroll-mt-28 border-b border-outline-variant bg-background py-24">
          <div className="editorial-layout relative mx-auto max-w-7xl px-6">
            <Reveal className="editorial-heading">
              <p className="cyber-kicker">Business value</p>
              <h2>Outcomes security leaders can measure</h2>
              <div className="outcome-illustration" aria-hidden>
                <span className="outcome-ring" /><span className="outcome-ring" />
                <MaterialSymbol name="shield" />
              </div>
              <DemoCta className="launch-button-secondary">Talk to our team</DemoCta>
            </Reveal>
            <div className="outcome-grid">
              {BUSINESS_BENEFITS.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <SpotlightCard
                    tilt={0}
                    className="outcome-card h-full"
                  >
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.07]">
                        <MaterialSymbol name={item.icon} className="text-xl text-primary" />
                      </div>
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section id="use-cases" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-24">
          <div className="cyber-dots cyber-grid-fade pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Use cases"
              title="Where teams deploy VRIKA"
              body="From continuous penetration testing to compliance validation, VRIKA adapts to the way your security programme runs."
            />
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <SpotlightCard
                    tilt={0}
                    className="group flex h-full items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-transform hover:-translate-y-1"
                  >
                    <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container transition-all duration-500 group-hover:border-primary/35 group-hover:bg-primary/[0.07] group-hover:rotate-6">
                      <MaterialSymbol name={item.icon} className="text-xl text-primary" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-on-surface">{item.title}</h3>
                    <span className="cyber-index ml-auto text-outline">/{pad2(i)}</span>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Customization */}
        <section id="customization" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-background py-24">
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading kicker="Flexibility" title="Customizable to your stack and your rules" />
            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CUSTOMIZATION_FEATURES.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <SpotlightCard className="h-full rounded-xl border border-outline-variant bg-surface-container-lowest p-7 shadow-sm">
                    <div className="flex items-center justify-between">
                      <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-24">
          <div className="editorial-layout relative mx-auto max-w-7xl px-6">
            <Reveal className="editorial-heading">
              <p className="cyber-kicker">Before you get started</p>
              <h2>Good questions.<br />Clear answers.</h2>
              <DemoCta className="launch-button-secondary">Talk to our team</DemoCta>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <LandingFaq items={FAQ_ITEMS} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="closing-section relative isolate overflow-hidden bg-background py-24">
          <MeshBackdrop />
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-60" />
          <div className="closing-panel relative z-10 mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <p className="cyber-kicker justify-center">Get started</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.02em] text-on-surface md:text-5xl">
                Hunt risks before{" "}
                <span className="vk-gradient-animate bg-gradient-to-r from-primary via-[#8b5cf6] to-primary bg-clip-text text-transparent">
                  attackers do
                </span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-on-surface-variant">
                See how VRIKA turns AI, automation, and 185+ security tools into continuous, validated offensive
                security.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <DemoCta />
                <a
                  href="#platform"
                  className="launch-button launch-button-secondary group"
                >
                  Explore the platform
                  <MaterialSymbol
                    name="arrow_forward"
                    className="text-lg transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <div className="vk-divider mx-auto mt-12 w-40" />
            </Reveal>
            <Reveal delay={420}>
              <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant/70">
                {BRAND_TAGLINE}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
