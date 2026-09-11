import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "Basketball Shot Analyzer - Manish Mandala",
  description:
    "Basketball Shot Analyzer case study: MediaPipe pose estimation scores elbow angle, knee bend, stance, and release position in real time.",
};

export default function BasketballAnalyzerPage() {
  return <CaseStudy project={getProjectBySlug("basketball-analyzer")} />;
}
