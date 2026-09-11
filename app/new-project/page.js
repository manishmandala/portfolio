import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "New Project - Manish Mandala",
  description: "A new project by Manish Mandala - write-up coming once it's built.",
};

export default function NewProjectPage() {
  return <CaseStudy project={getProjectBySlug("new-project")} />;
}
