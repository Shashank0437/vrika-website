import type { Metadata } from "next";
import { VrikaLandingPage } from "@/components/landing/VrikaLandingPage";

/**
 * Vrika marketing landing. Content sourced from the VRIKA Overview and
 * VRIKA Product & Feature Guide documents.
 *
 * Signed-in users can still open `/`; the app is reached via Login, not an automatic redirect.
 */
export const metadata: Metadata = {
  title: "Vrika | AI-Powered Offensive Security & Cloud Protection Platform",
  description:
    "VRIKA combines autonomous AI offensive testing, continuous cloud security posture management, and enterprise governance — orchestrating 185+ security tools from one conversational platform.",
};

export default function LandingPage() {
  return <VrikaLandingPage />;
}
