import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "Internship Intelligence Agent - Manish Mandala",
  description:
    "Internship Intelligence Agent case study: collects and scores internship postings from public company career APIs, presented in a Streamlit dashboard.",
};

export default function InternshipAgentPage() {
  return <CaseStudy project={getProjectBySlug("internship-agent")} />;
}
