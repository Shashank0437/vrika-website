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
import { CountUp } from "@/components/motion/CountUp";
import { HeroRadar } from "@/components/motion/HeroRadar";
import { LiveTerminal } from "@/components/motion/LiveTerminal";
import { Reveal } from "@/components/motion/Reveal";
import { LandingHeroPrimaryCta } from "@/components/stitch/LandingAuthCta";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";

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
          className="vk-sweep flex shrink-0 cursor-default items-center gap-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-2.5 transition-colors hover:border-primary/45"
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
    <div className="bg-background font-sans text-on-background antialiased selection:bg-primary selection:text-on-primary">
      <LandingNav />

      {/* Hero */}
      <main>
        <section className="relative isolate overflow-hidden border-b border-outline-variant bg-surface-container-low pt-32 md:pt-36">
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-70" />
          <div className="landing-hero-orb pointer-events-none absolute -left-40 top-[-12%] size-[min(110vw,560px)] rounded-full bg-primary/15 blur-[130px]" />
          <div className="landing-hero-orb landing-hero-orb-delay pointer-events-none absolute -right-32 top-1/4 size-[460px] rounded-full bg-primary/10 blur-[130px]" />
          <HeroRadar className="pointer-events-none absolute -right-24 top-8 size-[520px] opacity-[0.16]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)]">
            <div className="space-y-7">
              <Reveal>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-1.5 shadow-sm">
                  <span className="cyber-pulse size-1.5 rounded-full bg-tertiary" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    {HERO.eyebrow}
                  </span>
                </p>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-on-surface md:text-[4.25rem]">
                  {HERO.title}
                  <br />
                  <span className="vk-text-shine bg-gradient-to-r from-primary via-[#8b5cf6] to-primary bg-clip-text text-transparent">
                    {HERO.titleAccent}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={210}>
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-14 w-px shrink-0 bg-gradient-to-b from-primary/60 to-transparent" />
                  <p className="max-w-xl text-[1.0625rem] leading-relaxed text-on-surface-variant">{HERO.body}</p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3 pt-1">
                  <LandingHeroPrimaryCta className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-[0.9375rem] font-bold text-on-primary shadow-[0_10px_30px_-12px_var(--color-primary)] transition hover:opacity-90" />
                  <a
                    href="#platform"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-8 py-3.5 text-[0.9375rem] font-bold text-on-surface transition hover:border-primary/45 hover:text-primary"
                  >
                    Explore the platform
                    <MaterialSymbol name="arrow_forward" className="text-lg" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <p className="pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant/70">
                  {BRAND_TAGLINE}
                </p>
              </Reveal>
            </div>

            <Reveal delay={240} variant="scale">
              <LiveTerminal />
            </Reveal>
          </div>

          {/* Stat band */}
          <div className="relative z-10 border-t border-outline-variant bg-surface-container-lowest/70 backdrop-blur-sm">
            <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-outline-variant px-6 md:grid-cols-4 md:divide-x md:divide-y-0">
              {HERO.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 110} className="cyber-brackets cyber-brackets-static px-6 py-7 text-center">
                  <div>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <CountUp
                        value={stat.value}
                        className="block bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-[2.25rem] font-black leading-none text-transparent"
                      />
                      <span className="mt-2.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
                        {pad2(i)} · {stat.label}
                      </span>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

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
                  <article className="vk-sweep cyber-card cyber-brackets cyber-accent-top relative h-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-8">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.07]">
                        <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                      </div>
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-tight text-on-surface">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-on-surface-variant">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Platform at a glance */}
        <section id="platform" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-24">
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-7xl px-6">
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
        <section className="relative overflow-hidden border-b border-outline-variant bg-background py-24">
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Core capabilities"
              title="Built for how offensive security actually works"
            />
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {KEY_CAPABILITIES.map((item, i) => (
                <Reveal key={item.title} delay={i * 110}>
                  <article className="vk-sweep cyber-card group flex h-full items-start gap-5 rounded-xl border border-outline-variant bg-surface-container-lowest p-8">
                    <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.07] transition-transform group-hover:scale-110">
                      <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold tracking-tight text-on-surface">{item.title}</h3>
                        <span className="cyber-index text-outline">/{pad2(i)}</span>
                      </div>
                      <p className="mt-2 leading-relaxed text-on-surface-variant">{item.body}</p>
                    </div>
                  </article>
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
                  <article className="vk-pop vk-sweep flex h-full flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 transition-colors hover:border-primary/45">
                    <div className="flex items-center justify-between">
                      <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-on-surface">{item.title}</h3>
                  </article>
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
                  <article className="vk-sweep cyber-card cyber-brackets group h-full rounded-xl border border-outline-variant bg-surface-container-lowest p-7">
                    <div className="flex items-center justify-between">
                      <Icon icon={env.icon} className="size-9 text-on-surface transition-colors group-hover:text-primary" />
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">{env.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{env.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-20">
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
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
                  <span className="vk-pop inline-flex items-center gap-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-6 py-3 font-mono text-sm font-bold tracking-[0.1em] text-on-surface transition-colors hover:border-primary/50 hover:text-primary">
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
        <section id="business-value" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-background py-24">
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Business value"
              title="Outcomes security leaders can measure"
            />
            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {BUSINESS_BENEFITS.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <article className="vk-sweep cyber-card cyber-accent-top relative h-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-7">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.07]">
                        <MaterialSymbol name={item.icon} className="text-xl text-primary" />
                      </div>
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                  </article>
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
                  <article className="vk-sweep group flex h-full items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 transition-colors hover:border-primary/45">
                    <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container transition-colors group-hover:border-primary/35 group-hover:bg-primary/[0.07]">
                      <MaterialSymbol name={item.icon} className="text-xl text-primary" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-on-surface">{item.title}</h3>
                    <span className="cyber-index ml-auto text-outline">/{pad2(i)}</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Customization */}
        <section id="customization" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-background py-24">
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              kicker="Flexibility"
              title="Customizable to your stack and your rules"
            />
            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CUSTOMIZATION_FEATURES.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <article className="vk-sweep cyber-card cyber-brackets h-full rounded-xl border border-outline-variant bg-surface-container-lowest p-7">
                    <div className="flex items-center justify-between">
                      <MaterialSymbol name={item.icon} className="text-2xl text-primary" />
                      <span className="cyber-index text-outline">/{pad2(i)}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative scroll-mt-28 overflow-hidden border-b border-outline-variant bg-surface-container-low py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            <SectionHeading kicker="FAQ" title="Frequently asked questions" />
            <Reveal delay={120}>
              <div className="mt-12">
                <LandingFaq items={FAQ_ITEMS} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative isolate overflow-hidden bg-background py-28">
          <div className="cyber-grid cyber-grid-fade pointer-events-none absolute inset-0 opacity-70" />
          <div className="landing-hero-orb pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[130px]" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <p className="cyber-kicker justify-center">Get started</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.02em] text-on-surface md:text-5xl">
                Hunt risks before{" "}
                <span className="vk-text-shine bg-gradient-to-r from-primary via-[#8b5cf6] to-primary bg-clip-text text-transparent">
                  attackers do
                </span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-on-surface-variant">
                See how VRIKA turns AI, automation, and 185+ security tools into continuous, validated offensive security.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <LandingHeroPrimaryCta className="inline-flex items-center justify-center rounded-lg bg-primary px-9 py-4 text-[0.9375rem] font-bold text-on-primary shadow-[0_12px_34px_-14px_var(--color-primary)] transition hover:opacity-90" />
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-9 py-4 text-[0.9375rem] font-bold text-on-surface transition hover:border-primary/45 hover:text-primary"
                >
                  Talk to our team
                  <MaterialSymbol name="arrow_forward" className="text-lg" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={360}>
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
