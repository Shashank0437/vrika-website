import type { Metadata } from "next";
import { VrikaLandingPage } from "@/components/landing/VrikaLandingPage";

/**
 * Vrika marketing landing. Content sourced from the VRIKA Overview and
 * VRIKA Product & Feature Guide documents.
 *
 * Signed-in users can still open `/` without an automatic redirect.
 */
export const metadata: Metadata = {
  title: "Vrika | Web, Mobile & Cloud Security Platform",
  description:
    "Assess web applications, Android and iOS apps, and cloud environments with VRIKA. AI-guided testing, mobile analysis, runtime evidence, and enterprise governance.",
};

export default function LandingPage() {
  return <VrikaLandingPage />;
}
