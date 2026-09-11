import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "Multi-Blade Knife - Manish Mandala",
  description:
    "Multi-Blade Knife case study: user research, Pugh matrix concept selection, prototype iteration, and verification testing for Ohio State's First Year Engineering program.",
};

export default function MultiBladeKnifePage() {
  return <CaseStudy project={getProjectBySlug("multi-blade-knife")} />;
}
