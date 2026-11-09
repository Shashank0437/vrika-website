import type { Metadata } from "next";
import { MarketingSubpage } from "@/components/layout/MarketingSubpage";

export const metadata: Metadata = {
  title: "About | Vrika",
  description: "Mission, platform, and who VRIKA is built for.",
};

export default function AboutPage() {
  return (
    <MarketingSubpage
      title="About Vrika"
      eyebrow="Company"
      lastUpdated="May 8, 2026"
      breadcrumbLabel="Company"
      toc={[
        { href: "#mission", label: "Mission" },
        { href: "#platform", label: "The platform" },
        { href: "#who", label: "Who we serve" },
        { href: "#values", label: "Operating values" },
        { href: "#contact", label: "Contact" },
      ]}
    >
      <p className="lead-intro text-on-surface">
        VRIKA brings web, mobile, and cloud security into one platform. It combines AI-guided web testing,
        mobile application analysis, cloud security posture management, and enterprise governance — so
        security teams can move beyond point-in-time assessments to continuous, intelligence-driven operations.
      </p>

      <h2 id="mission">Mission</h2>
      <p>
        Help organizations hunt risks before attackers do. Modern teams face an ever-growing attack surface across applications,
        cloud environments, infrastructure, APIs, and digital assets. VRIKA&apos;s AI security agents continuously identify,
        validate, and prioritize risk by orchestrating real-world attack simulations — at machine speed, under human control.
      </p>

      <h2 id="platform">The platform</h2>
      <ul>
        <li>
          <strong>Web Security Workspace</strong>—the conversational workspace for launching assessments, running AI-guided attack
          chains, reviewing findings, and generating reports.
        </li>
        <li>
          <strong>AI Orchestration Engine</strong>—the intelligence layer that plans and chains full attack workflows across 120+
          integrated security tools.
        </li>
        <li>
          <strong>Cloud Security</strong>—continuous multi-cloud posture management with hundreds of checks, compliance framework
          mapping, and risk scoring.
        </li>
        <li>
          <strong>Mobile Security</strong>—Android and iOS static analysis, runtime investigation in configured test environments,
          scan comparison, evidence review, and static PDFs alongside saved dynamic reports.
        </li>
        <li>
          <strong>Governance &amp; Deployment</strong>—multi-tenancy, RBAC, approvals, audit trails, SSO, and cloud or on-premise
          deployment.
        </li>
      </ul>

      <h2 id="who">Who we serve</h2>
      <ul>
        <li>Internal red teams and security operations groups running continuous validation programs;</li>
        <li>Product security teams assessing web and mobile applications, APIs, and multi-tenant SaaS;</li>
        <li>Consultancies delivering recurring penetration testing with standardized reporting;</li>
        <li>Regulated and security-conscious organizations with strict data-residency and compliance requirements.</li>
      </ul>

      <h2 id="values">Operating values</h2>
      <ul>
        <li>
          <strong>Authorization first</strong>—assessments run only within environments you legally control.
        </li>
        <li>
          <strong>Humans in control</strong>—approval-based execution, RBAC, and complete audit trails on every action.
        </li>
        <li>
          <strong>Privacy by default</strong>—sensitive data is masked before it ever reaches an AI model, then restored for your
          reports.
        </li>
        <li>
          <strong>Composable automation</strong>—orchestrate the tooling your team already trusts, from one interface.
        </li>
      </ul>

      <h2 id="contact">Contact</h2>
      <p>
        Media, partnership, or procurement inquiries should route through your Vrika account manager or the contact form on this
        site. For security-sensitive topics, use the Responsible Disclosure channel.
      </p>
    </MarketingSubpage>
  );
}
