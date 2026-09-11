import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "Combination Lock Mechanism - Manish Mandala",
  description:
    "Combination Lock case study: exploded assembly, full bill of materials, and detail drawings for a mechanical combination lock, Ohio State ENGR 1182.",
};

export default function CombinationLockPage() {
  return <CaseStudy project={getProjectBySlug("combination-lock")} />;
}
